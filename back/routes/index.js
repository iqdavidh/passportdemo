const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});


/* con authenticacion ********************************************************* */

const ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log('current user');
		console.warn(req.user);

		return next();
	} else {
		res.redirect('/login')
	}
};

const checkRoles = (role) => {
	return function (req, res, next) {

		if (!req.isAuthenticated()) {
			res.redirect('/login')
		}

		if (req.user.role === 'ADMIN') {
			return next();
		} else if (req.user.role === role) {
			return next();
		} else {
			res.redirect('/login')
		}

	}
};

router.get("/private-page", ensureAuthenticated, (req, res) => {
	res.render("private", {user: req.user});
});


router.get('/private-only-admin', checkRoles('ADMIN'), (req, res) => {
	res.render('private-only-admin', {user: req.user});
});


module.exports = router;
