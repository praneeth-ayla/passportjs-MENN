const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../../models/User');
const { findOrCreateUser } = require('../../utils/auth-helpers');

module.exports = new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "/auth/microsoft/callback",
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {

        console.log("profile: microsoft: ", profile)
        try {
            const user = await findOrCreateUser(profile, 'microsoft');
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });