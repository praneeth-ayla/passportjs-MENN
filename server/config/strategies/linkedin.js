const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../../models/User');
const { findOrCreateUser } = require('../../utils/auth-helpers');

module.exports = new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/auth/linkedin/callback",
    scope: ['r_liteprofile', 'r_emailaddress'],
    state: true
},
    async (accessToken, refreshToken, profile, done) => {
        console.log("profile: linkedin: ", profile);
        try {
            const user = await findOrCreateUser(profile, 'linkedin');
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });
