'use strict';

// routes/auth-routes.js
const express = require("express");
const apiRoutes = express.Router();
const passport = require("passport");

// User model
const User = require("../models/user");


// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;




const BuilderJsonresponse = {
	Success: (res, dataResponse) => {

		let data = {
			success: true,
			msg: '',
			data: dataResponse
		};

		res.status(200).json(data);
	},
	Error: (res, error, code = 500) => {
		let data = {
			success: false,
			msg: error
		};
		res.status(code).json(data);
	}
};


apiRoutes.post("/signup", (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	if (username === "" || password === "") {
		res.render("auth/signup", {message: "Indicate username and password"});
		return;
	}

	User.findOne({username})
		.then(user => {
			if (user !== null) {
				res.render("auth/signup", {message: "The username already exists"});
				return;
			}

			const salt = bcrypt.genSaltSync(bcryptSalt);
			const hashPass = bcrypt.hashSync(password, salt);

			const newUser = new User({
				username,
				password: hashPass
			});

			newUser.save((err) => {
				if (err) {
					res.render("auth/signup", {message: "Something went wrong"});
				} else {
					res.redirect("/");
				}
			});
		})
		.catch(error => {
			next(error)
		})
});


/*TODO <----- corregir esto, no estamos regresando un json*/
apiRoutes.post("/login", passport.authenticate("local", {
	successRedirect: "/private-page",
	failureRedirect: "/login",
	failureFlash: true,
	passReqToCallback: true
}));

apiRoutes.get("/logout", (req, res) => {
	req.logout();
	BuilderJsonresponse.Success(res, {is_logout: true});
});


apiRoutes.get("/auth/google", passport.authenticate("google", {
	scope: ["https://www.googleapis.com/auth/plus.login",
		"https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

apiRoutes.get("/auth/google/callback", passport.authenticate("google", {
	failureRedirect: "/",
	successRedirect: "/api/private-page"
}));


let validarRole = (req, role = '') => {

	return true; // <--------------- temporalmente vemos si esta funcionado

	if (!req.isAuthenticated()) {
		return false;
	}

	if (req.user.role === 'ADMIN') {
		return true;
	} else if (role === '' || req.user.role === role) {
		return true
	} else {
		return false;
	}

};


apiRoutes.get('/private-only-admin', (req, res) => {

	let isAutorizado = validarRole(req, 'ADMIN');
	BuilderJsonresponse.Success(res, {isAllow: isAutorizado});
});

apiRoutes.get('/private_page', (req, res) => {
	let isAutorizado = validarRole(req);
	BuilderJsonresponse.Success(res, {isAllow: isAutorizado});
});

apiRoutes.get('/room', (req, res) => {
	let isAutorizado = validarRole(req);
	Buil(res, {isAllow: isAutorizado});
});




/*
* const UrlApi = {
	login: urlBase + '/api/login',
	logout: urlBase + '/api/logout',
	private_page: urlBase + '/api/private-page',
	private_only_admin: urlBase + '/api/private-only-admin',
	room: urlBase + '/api/rooms',
	validar_acceso: urlBase + '/api/validar_acceso'
};
* */


module.exports = apiRoutes;
