var router = require('express').Router();
var signupcontroller = require('../controllers/signup');
var userController = require('../controllers/userModule');
var blogs = require('../controllers/blogs');

router.route('/signup')
        .post(signupcontroller.logic)

router.route('/user')
        .post(userController.logic)

router.route('/blog')
        .post(blogs.logic)
        
module.exports = router