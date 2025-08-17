import {Strategy as LocalStrategy} from 'passport-local'
import mongoose from 'mongoose'
import User from '../models/User.js'

export default async function (passport){
  
    
    passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try{
        const existingUser = await User.findOne({ email: email.toLowerCase() })
        if (!existingUser){
          return done(null,false,{ msg: `Email ${email} not found.` })
        }
        if(!existingUser.password){
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        const isMatch = await existingUser.comparePassword(password)
        if (isMatch) return done(null,existingUser)
        return done(null, false, { msg: "Invalid email or password." })
      
        // existingUser.comparePassword(password, (err, isMatch) => {
        //   if (err) {
        //     return done(err);
        //   }
        //   if (isMatch) {
        //     return done(null, user);
        //   }
        //   return done(null, false, { msg: "Invalid email or password." });
        // });
      }catch(err){
        console.log(err)
      }
     
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean();
      done(null, user || false);
    } catch (err) {
      done(err);
    }
  });
}