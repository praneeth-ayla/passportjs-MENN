const User = require('../models/User');

async function findOrCreateUser(profile, providerType) {

    // Look for user with this provider ID and type
    let user = await User.findOne({
        providerId: profile.id,
        providerType: providerType
    });

    // If found, return the user
    if (user) {
        return user;
    }

    // Try to find user by email if available
    if (profile.emails && profile.emails[0]) {
        const email = profile.emails[0].value;

        user = await User.findOne({ email: email });

        if (user) {
            // If user has a different provider already, we have a decision to make:
            // For now, we'll just update their provider info to the new provider
            user.providerId = profile.id;
            user.providerType = providerType;
            return await user.save();
        }
    }

    // Create new user
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value :
        `${providerType}_${profile.id}@placeholder.com`;

    console.log(`Creating new user with email: ${email}`);

    const newUser = {
        providerId: profile.id,
        providerType: providerType,
        email: email,
        name: profile.displayName,
        avatar: profile.photos ? profile.photos[0].value : '',
    };

    return await User.create(newUser);
}

module.exports = {
    findOrCreateUser
};