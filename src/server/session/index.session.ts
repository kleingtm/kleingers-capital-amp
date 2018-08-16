import * as express from 'express';
// https://github.com/passport/express-4.x-local-example/blob/master/server.js
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import { Strategy } from 'passport-local';
import UsersModel from '../../db/models/users';

// DB-agnostic session handling, login, and logout
export default class Session {

    private app: express.Application;
    private db;
    private usersModel;

    constructor(config: any) {
        
        this.app = config.app;
        this.db = config.db;
        const usersModel = this.db.sequelize.define('users', UsersModel);

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
                    return usersModel.findOne({
                        where: {
                            email: email,
                            password: password
                        }
                    })
                    .then(response => {
                        if (!response || !response.dataValues) { return cb(null, false); } // user not found or error
                        return cb(null, response.dataValues); // user found
                    });
                })
        );

        // Configure Passport authenticated session persistence.
        //
        // In order to restore authentication state across HTTP requests, Passport needs
        // to serialize users into and deserialize users out of the session.  The
        // typical implementation of this is as simple as supplying the user ID when
        // serializing, and querying the user record by ID from the database when
        // deserializing.
        passport.serializeUser((user, cb) => {
            cb(null, user._id);
        });

        passport.deserializeUser((_id, cb) => {
            return usersModel.findById(_id)
            .then(response => {
                if (!response || !response.dataValues) { return cb(response); } // error
                cb(null, response.dataValues);
            });
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
        
        // login POST route
        this.app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
            (req, res) => {
                res.json({
                    redirectUrl: req.session.returnTo || '/'
                });
            });

        // logout GET - logs out then redirects to login
        this.app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/login');
        });
    }
}