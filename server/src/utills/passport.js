const passport = require('passport');
const bcrypt = require('bcryptjs');
const FacebookStrategy = require('passport-facebook');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const User = require('../models/User');



passport.serializeUser((user,done)=>{
    done(null, user.id);
})

passport.deserializeUser(async (id,done)=>{
    const user = await User.findById(id);
        done(null, user);
})

// passport.use("local-signup",
//     new LocalStrategy(
//     { 
//     usernameField: 'text',
//     passwordField : 'password',
//      },
//         async (req,text, password, done) => {
//             console.log(req.body,text, password);

//         }
//     )
// )

passport.use(
    new LocalStrategy(
        { usernameField: 'text' },
        async (text, password ,done) => {
            console.log(text, password);
            const user = await User.findOne({
                $or: [{username:text}, {email:text}, {phone:text}]
            });
            if(!user) return done(null, false);
            const doesPasswordMatch = await bcrypt.compare(password, user.password);
            if (!doesPasswordMatch)  return done(null, false); 
            return done(null, user);
        }
    )
)

passport.use(
    new FacebookStrategy(
        {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/facebook/redirect"
    }, async (accessToken, refreshToken, profile, cb) => {
        console.log(profile)
        const email = profile.emails[0].value
        const user = await User.findOne({email});
        if(user) return done(null, user);

        const newUser = new User({
            username: profile.displayName,
            googleID: profile.id,
            email: profile.emails[0].value

        })
        await newUser.save();
        console.log(newUser);
        done(null, newUser);
    }
))
