const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google'));
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login'
    })
);

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login'
    })
);

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login'
    })
);

router.get('/github', passport.authenticate('github'));
router.get('/github/callback',
    passport.authenticate('github', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login'
    })
);

router.get('/microsoft', passport.authenticate('microsoft'));
router.post('/microsoft/callback',
    passport.authenticate('microsoft', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login',
        failureMessage: true
    })
);


router.get('/apple', passport.authenticate('apple'));
router.post('/apple/callback',
    passport.authenticate('apple', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login',
        failureMessage: true
    })
);


router.get('/discord', passport.authenticate('discord'));
router.get('/discord/callback',
    passport.authenticate('discord', {
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