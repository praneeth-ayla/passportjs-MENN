const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../../models/User');
const { findOrCreateUser } = require('../../utils/auth-helpers');

module.exports = new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: "/auth/discord/callback",
    scope: ['identify', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        console.log("profile: discord: ", profile);
        try {
            const user = await findOrCreateUser(profile, 'discord');
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });
