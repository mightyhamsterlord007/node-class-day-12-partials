var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var userMiddleware = require('../utils/usersMiddleware');

/* GET users listing. */
router.get('/createuser', function(req, res, next) {
  res.render('register', { title: 'Sign up' });
});

router.post('/createuser', userMiddleware.checkIfUserAlreadyExists, function(req, res, next) {
  userController.createUser(req.body, function(err, user) {
    if (err) {
      res.render('result', {
        message: 'Failure to create new User, try again.',
        error: err
      });
      return;
    }
    res.render('result', {
      message: 'Successfully registered ' + user.name + '.',
      data: user
    });
    return;
  });
});

router.post('/login', function(req, res, next) {
  userController.loginUser(req.body, function(err, user) {
    if (err) {
      res.status(404).json({
        message: 'Fail',
        error: err
      });
      return;
    }

    if (user === null) {
      res.render('result', {
        message: 'Failure to login, Please check your username and password',
        error: 'Check your username and password'
      });
      return;
    }
    res.render('result', {
      message: 'Hello ' + user.name + ", you've successfully logged in",
      data: user
    });
    return;
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please Log In' });
});

module.exports = router;
