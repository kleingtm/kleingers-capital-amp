'use strict';

import { RegExp } from 'core-js/library/web/timers';
// https://github.com/passport/express-4.x-local-example/blob/master/server.js
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import { Strategy } from 'passport-local';
// const Strategy = require('passport-local').Strategy;
// const bodyParser = require('body-parser');

export default class Session {
    constructor(config) {
        this.app = config.app;

        // Configure the local strategy for use by Passport.
        //
        // The local strategy require a `verify` function which receives the credentials
        // (`username` and `password`) submitted by the user.  The function must verify
        // that the password is correct and then invoke `cb` with a user object, which
        // will be set at `req.user` in route handlers after authentication.
        passport.use(
            new Strategy(
                {
                    usernameField : 'username',
                    passwordField : 'password',
                    passReqToCallback : true // allows us to pass back the entire request to the callback
                },
                function (req, username, password, cb) {
                    let hey = "";
                    return cb(null, username);
                    // db.users.findByUsername(username, function(err, user) {
                    // if (err) { return cb(err); }
                    // if (!user) { return cb(null, false); }
                    // if (user.password != password) { return cb(null, false); }
                    // return cb(null, user);
                    // });
                })
        );

        // Configure Passport authenticated session persistence.
        //
        // In order to restore authentication state across HTTP requests, Passport needs
        // to serialize users into and deserialize users out of the session.  The
        // typical implementation of this is as simple as supplying the user ID when
        // serializing, and querying the user record by ID from the database when
        // deserializing.
        passport.serializeUser(function (username, cb) {
            // cb(null, user.id);
            var lkajdf = "";
            cb(null, username);
        });

        passport.deserializeUser(function (id, cb) {
            // db.users.findById(id, function (err, user) {
            //     if (err) { return cb(err); }
            //     cb(null, user);
            // });
            cb(null, "tom");
            //var aldkfj = "";
        });

        this.app.use(require('cookie-parser')());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json()); // without this, the passport.authenticate method will never hit, and you'll get 404s
        this.app.use(require('express-session')({secret: '@~|_-1#<"yHkUzd', resave: false, saveUninitialized: false}));
        this.app.use(require('connect-flash')());

        // Initialize Passport and restore authentication state, if any, from the
        // session.
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // Lock everything down AFTER public routes are declared
        // only allow login, logout, and static files that AREN'T .html to be accessed when NOT logged in
        this.app.use(/^\/(?!(login|logout|(.*\.(?!html)))).*/, require('connect-ensure-login').ensureLoggedIn());
        this.app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
            (req, res) => {
                res.json({
                    redirectUrl: req.session.returnTo || '/'
                });
            });
        this.app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/login');
        })
    }
}