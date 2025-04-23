const User = require('../models/User');
const GoogleStrategy = require('./strategies/google');
const FacebookStrategy = require('./strategies/facebook');
const TwitterStrategy = require('./strategies/twitter');

module.exports = (passport) => {
    // Google Strategy
    passport.use(GoogleStrategy);

    // Facebook Strategy
    passport.use(FacebookStrategy);

    // Twitter Strategy
    passport.use(TwitterStrategy)

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