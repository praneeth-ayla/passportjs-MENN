const GoogleStrategy = require('./strategies/google');
const FacebookStrategy = require('./strategies/facebook');
const User = require('../models/User');

module.exports = (passport) => {
    // Google Strategy
    passport.use(GoogleStrategy);

    // Facebook Strategy
    passport.use(FacebookStrategy);

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