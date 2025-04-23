const GithubStrategy = require('passport-github2').Strategy;
const User = require('../../models/User');
const { findOrCreateUser } = require('../../utils/auth-helpers');

module.exports = new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {

        console.log("profile: github: ", profile)
        try {
            const user = await findOrCreateUser(profile, 'github');
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });