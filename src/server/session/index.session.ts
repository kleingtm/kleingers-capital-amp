import * as express from 'express';
// https://github.com/passport/express-4.x-local-example/blob/master/server.js
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import { Strategy } from 'passport-local';
import UsersModel from '../../db/models/users';

// const Strategy = require('passport-local').Strategy;
// const bodyParser = require('body-parser');

export default class Session {

    private app: express.Application;

    constructor(config: any) {
        this.app = config.app;

        // Configure the local strategy for use by Passport.
        //
        // The local strategy require a `verify` function which receives the credentials
        // (`email` and `password`) submitted by the user.  The function must verify
        // that the password is correct and then invoke `cb` with a user object, which
        // will be set at `req.user` in route handlers after authentication.
        passport.use(
            new Strategy(
                {
                    usernameField : 'email',
                    passwordField : 'password',
                    passReqToCallback : true // allows us to pass back the entire request to the callback
                },
                function (req, email, password, cb) {
                    const hey = '';

                    return UsersModel.findOne({
                        where: {
                            email: email,
                            password: password
                        }
                    })
                    .then(userFound => {
                        cb(null, userFound.email)
                    });

                    // db.users.findByemail(email, function(err, user) {
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
        passport.serializeUser(function (email, cb) {
            // cb(null, user.id);
            const lkajdf = '';
            cb(null, email);
        });

        passport.deserializeUser(function (id, cb) {
            // db.users.findById(id, function (err, user) {
            //     if (err) { return cb(err); }
            //     cb(null, user);
            // });
            cb(null, 'tom');
            //var aldkfj = '';
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
        // this.app.use(/^\/(?!(login|logout|(.*\.(?!html)))).*/, require('connect-ensure-login').ensureLoggedIn());
        this.app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
            (req, res) => {
                res.json({
                    redirectUrl: req.session.returnTo || '/'
                });
            });
        this.app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/login');
        });
    }
}