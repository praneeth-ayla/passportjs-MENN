const User = require('../models/User');
const GoogleStrategy = require('./strategies/google');
const FacebookStrategy = require('./strategies/facebook');
const TwitterStrategy = require('./strategies/twitter');
const GithubStrategy = require('./strategies/github');
const MicrosoftStrategy = require('./strategies/microsoft');
const AppleStrategy = require('./strategies/apple');
const LinkedinStrategy = require('./strategies/linkedin');
const DiscordStrategy = require('./strategies/discord');

module.exports = (passport) => {
    // Google Strategy
    passport.use(GoogleStrategy);

    // Facebook Strategy
    passport.use(FacebookStrategy);

    // Twitter Strategy
    passport.use(TwitterStrategy)

    // Github
    passport.use(GithubStrategy)

    // Microsoft
    passport.use(MicrosoftStrategy)

    // Apple
    passport.use(AppleStrategy)

    // Linkedin
    passport.use(LinkedinStrategy)

    passport.use(DiscordStrategy)

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};