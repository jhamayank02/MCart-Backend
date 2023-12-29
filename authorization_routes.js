const express = require('express');
const router = express.Router();
const passport = require('passport');  // authentication

const User = require('./Users');

router.get('/failurejson', (req, res) => {
    res.json({ authenticated: false });
})

router.post('/register', (req, res) => {
    var userdata = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        contact_no: req.body.contact_no,
    });

    User.register(userdata, req.body.password).then(function (registeredUser) {
        passport.authenticate("local", { failureRedirect: '/failurejson' })(req, res, function () {
            res.json({ authenticated: true, username: req.user.username });
        })
    }).catch((err)=>{
        res.json({error: true, status: 200, error_msg: err.message});
    });
})

router.post('/login', passport.authenticate("local", {
    failureRedirect: "failurejson"
}), function (req, res) {
    res.json({ authenticated: true, username: req.user.username });
})

router.post('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.json({ authenticated: false })
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = {
    isLoggedIn: isLoggedIn,
    authRoutes: router
}