'use strict';

// routes/auth-routes.js
const express = require("express");
const apiRoutes = express.Router();
const passport = require("passport");

// User model
const User = require("../models/user");

/**
 * Created by David on 13/07/2019.
 */

/*
* const UrlApi = {
	login: urlBase + '/api/login',
	logout: urlBase + '/api/logout',
	private_page: urlBase + '/api/private-page',
	private_only_admin: urlBase + '/api/private-only-admin',
	rooom: urlBase + '/api/rooms',
	validar_acceso: urlBase + '/api/validar_acceso'
};
* */


module.exports = apiRoutes;
