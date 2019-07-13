const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


/* con authenticacion ********************************************************* */

const ensureAuthenticated =(req, res, next) =>{
  if (req.isAuthenticated()) {
    console.log('current user');
    console.warn( req.user);

    return next();
  } else {
    res.redirect('/login')
  }
};

router.get("/private-page", ensureAuthenticated, (req, res) => {
  res.render("private", { user: req.user });
});


module.exports = router;
