const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google'));
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login'
    })
);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).send('Logout error');

        // Destroy session and clear cookie
        req.session.destroy((err) => {
            if (err) console.error('Session destruction error:', err);

            res.clearCookie('connect.sid', {
                path: '/',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production'
            });
            res.sendStatus(200);
        });
    });
});

module.exports = router;