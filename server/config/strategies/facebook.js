const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/User');
const { findOrCreateUser } = require('../../utils/auth-helpers');

module.exports = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        console.log("profile: facebook: ", profile)
        try {
            const user = await findOrCreateUser(profile, 'facebook');
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });