const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/User');
const { findOrCreateUser } = require('../../utils/auth-helpers');

module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {

        console.log("profile: google: ", profile)
        try {
            const user = await findOrCreateUser(profile, 'google');
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });