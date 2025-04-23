const AppleStrategy = require('passport-apple');
const User = require('../../models/User');
const { findOrCreateUser } = require('../../utils/auth-helpers');

module.exports = new AppleStrategy({
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    keyID: process.env.APPLE_KEY_ID,
    privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    callbackURL: "/auth/apple/callback",
    scope: ['name', 'email']
},
    async (accessToken, refreshToken, idToken, profile, done) => {
        console.log("profile: apple: ", profile);
        try {
            const user = await findOrCreateUser(profile, 'apple');
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });
