import passport from 'passport';
import refresh from 'passport-oauth2-refresh';
import User from '../models/user';
import config from './auth';
const randomstring =require('randomstring');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy =require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password'
            },
            function(email, password, done) {
                User.findOne({
                    email: email
                }, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            message: 'Incorrect username.'
                        })
                    };
                    if (!user.validPassword(password)) {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }
                    return done(null, user);
                });
              }
            ));
passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : config.facebookAuth.API_ID,
        clientSecret    : config.facebookAuth.API_SECRET,
        callbackURL     : config.facebookAuth.CALLBACK_URL,
        profileFields: ['id', 'emails', 'name']

    },
    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // asynchronous
        console.log("facbook");
        process.nextTick(function() {
            // find the user in the database based on their facebook id
            User.findOne({$or :[{'facebook.id' : profile.id},{'email': profile.emails[0].value}] }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    let newUser            = new User();
                    // set all of the facebook information in our user model
                    newUser.facebook={"id":profile.id,
                                    "token":token};
                    newUser.firstName  = profile.name.givenName; // look at the passport user profile to see how names are returned
                    newUser.lastName   =profile.name.familyName;
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.passhash=randomstring.generate();
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
const googleStrategy =new GoogleStrategy({
        clientID        : config.googleAuth.clientID,
        clientSecret    : config.googleAuth.clientSecret,
        callbackURL     : config.googleAuth.callbackURL,
    },
    function(token, refreshToken, params, profile, done) {
        console.log(params);
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            // try to find the user based on their google id
            User.findOne({$or :[{'google.id' : profile.id},{'email': profile.emails[0].value}] }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    user.google.accessToken=token;
                    if(refreshToken){
                      user.google.refreshToken = refreshToken;
                    }
                    user.markModified('google');
                    user.save()
                    .then((newUser)=>{
                        // if a user is found, log them in
                        console.log(newUser);
                        return done(null, newUser);
                    });
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();
                    newUser.google={"id":profile.id,
                                    "accessToken":token,
                                    "refreshToken":refreshToken||undefined,
                                    "name":profile.displayName,
                                  };
                    newUser.firstName=profile.name.givenName;
                    newUser.lastName=profile.name.familyName;
                    newUser.email = profile.emails[0].value; // pull the first email
                    newUser.passhash=randomstring.generate();
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    });
passport.use(googleStrategy);
refresh.use(googleStrategy);

/*

Use later
if(reason.code === 401) {
          // Access token expired.
          // Try to fetch a new one.
          refresh.requestNewAccessToken('google', user.refreshToken, function(err, accessToken) {
            if(err || !accessToken) { return send401Response(); }

            // Save the new accessToken for future use
            user.save({ accessToken: accessToken }, function() {
             // Retry the request.
             makeRequest();
            });
          });

        }

*/


module.exports = passport;
