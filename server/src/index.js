const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./utills/passport');

require('dotenv').config();

//conection to mongodb 
mongoose.connect(process.env.MONGO_URI, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    }, (err) => {
        if (err) {
            console.log(err);
        }else {
            console.log(`connection established successfully ${mongoose.connection.host}`);
        }
    }
)


const app = express();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('sever is listening on port ' + PORT);
})