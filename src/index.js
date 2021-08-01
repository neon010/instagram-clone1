const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./utills/passport');

require('dotenv').config();

//conection to mongodb 
mongoose.connect(process.env.MONGO_URI, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
    }, (err) => {
        if (err) {
            console.log(err);
        }else {
            console.log(`connection established successfully ${mongoose.connection.host}`);
        }
    }
)


const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5000",
      credentials: true
    }
});




app.use(cors());
app.use(express.json());

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIES_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./router/authRouter'));
app.use(require('./router/profileRouter'));
app.use(require('./router/postRouter'));
app.use(require('./router/chatRoomRouter'));
app.use(require('./router/messageRouter'));
app.use(require('./router/notificationRouter'));



io.on('connection', (socket) => {

    if(socket){
        socket.on('joinUser', (user)=> {
            if(user){
                socket.join(user._id);
                socket.emit("connected");
            }
        });
        socket.on("join room", (room) => {
            socket.join(room);
        });

        socket.on("typing", room => socket.in(room).emit("typing"));

        socket.on("stop typing", room => socket.in(room).emit("stop typing"));
        socket.on("notification received", (room )=> {
            console.log({room});
            socket.in(room).emit("notification received")
        });

        // socket.on("", (room) =>{
        //     console.log({room});
        //     socket.to(room).emit("recieved notification", "xyz");
        // })

        socket.on("new message", newMessage => {

            const chat = newMessage.chat;
    
            if(!chat.users) return console.log("Chat.users not defined");
    
            chat.users.forEach(user => {
                // console.log(user)
                
                if(user._id == newMessage.sender._id) return;
                socket.in(user._id).emit("message received", newMessage);
            })
        });


    }
})

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log('sever is listening on port ' + PORT);
})