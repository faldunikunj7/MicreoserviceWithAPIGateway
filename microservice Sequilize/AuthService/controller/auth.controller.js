const express = require('express');
const router = express.Router();
const userService = require('../service/users/auth.service');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/jwt');
const userBodySchema = [
    check('email', 'email is mandatory').not().isEmpty().isEmail(),
    check('password', 'password is mandatory').not().isEmpty().isLength({ min: 5 }),
    check('firstName', "First name is mandatory").not().isEmpty().isLength({ min: 3 }),
    check('lastName', 'last name is mandator').not().isEmpty().isLength({ min: 3 }),
    check('organizationName', 'Organization name is mandator').not().isEmpty().isLength({ min: 3 }),
]

// routes
router.post('/login', authenticate);
router.post('/register', userBodySchema, register);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json({ data: user, message: 'Login Success' }).status(200) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    } else {
        userService.create(req.body)
            .then((resutl) => res.json(resutl))
            .catch(err => next(err));
    }
}
