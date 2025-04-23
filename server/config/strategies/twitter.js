const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../../models/User');
const { findOrCreateUser } = require('../../utils/auth-helpers');

module.exports = new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/auth/twitter/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        console.log("profile: twitter: ", profile)
        try {
            const user = await findOrCreateUser(profile, 'twitter');
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });