require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const flash = require("connect-flash");

const User = require("./models/user");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

mongoose
	.connect('mongodb://localhost/passportdemo', {useNewUrlParser: true})
	.then(x => {
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
	})
	.catch(err => {
		console.error('Error connecting to mongo', err)
	});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const session = require("express-session");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(session({
	secret: "our-passport-local-strategy-app",
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, cb) => {
	cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
	User.findById(id, (err, user) => {
		if (err) {
			return cb(err);
		}
		cb(null, user);
	});
});

app.use(flash());

passport.use(new LocalStrategy({
	passReqToCallback: true
}, (req, username, password, next) => {
	User.findOne({username}, (err, user) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return next(null, false, {message: "usuario incorrecto"});
		}

		if (!bcrypt.compareSync(password, user.password)) {

			//TODO incremenar contador de intentos

			let fnIncrementas = async () => {
				// const query = {_id: user._id};
				// const update = {}
				// User.findOneAndUpdate(query, update, {new: true}).exec(function (err, docs) {
				// 	console.log(docs)
				// })
			};

			return next(null, false, {message: "Incorrect password"});
		}

		//TODO RESET contador de intentos


		return next(null, user);
	});
}));

let credenciales = require("../client_secret-gplus");

passport.use(new GoogleStrategy({
	clientID: credenciales.web.client_id,
	clientSecret: credenciales.web.client_secret,
	callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({googleID: profile.id})
		.then(user => {

			if (user) {
				return done(null, user);
			}

			const newUser = new User({
				googleID: profile.id
			});

			newUser.save()
				.then(user => {
					done(null, newUser);
				})
		})
		.catch(error => {
			done(error)
		})

}));


let Auth0Strategy = require('passport-auth0');
let clavesAuth0 = require("../claves-auth0");


passport.use(new Auth0Strategy({
		domain: 'iqdavidh.auth0.com',
		clientID: clavesAuth0.id,
		clientSecret: clavesAuth0.secret,
		callbackURL: '/auth/auth0/callback'
	},
	function (accessToken, refreshToken, extraParams, profile, done) {
		// accessToken is the token to call Auth0 API (not needed in the most cases)
		// extraParams.id_token has the JSON Web Token
		// profile has all the information from the user
		return done(null, profile);
	}
));


// Express View engine setup

app.use(require('node-sass-middleware')({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Routes
const authRoutes = require("./routes/auth-routes");

app.use('/', authRoutes);

const index = require('./routes/index');
app.use('/', index);

module.exports = app;
