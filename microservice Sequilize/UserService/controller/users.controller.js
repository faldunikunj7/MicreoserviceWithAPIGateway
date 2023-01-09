const express = require('express');
const router = express.Router();
const { getById, update: userUpdate } = require('../service/users/user.service');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/jwt');
const userBodySchema = [
  // check('email', 'email is mandatory').not().isEmpty().isEmail(),
  // check('password', 'password is mandatory').not().isEmpty().isLength({ min: 5 }),
  check('firstName', "First name is mandatory").not().isEmpty().isLength({ min: 3 }),
  check('lastName', 'last name is mandator').not().isEmpty().isLength({ min: 3 }),
  check('organizationName', 'Organization name is mandator').not().isEmpty().isLength({ min: 3 }),
]

// routes
router.put('/profile', auth, userBodySchema, update);
router.get('/profile', auth, getBySession);
// router.post('/organizition',organization);

module.exports = router;

function organization(req, res, next) {
  userService.addOrganization(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}


function getBySession(req, res, next) {
  console.log("req",req);
  getById(req.auth.id)
    .then(user => user ? res.json(user) : res.json({ message: "No recor found" }).sendStatus(404))
    .catch(err => next(err));
}

function update(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  } else {
    userUpdate(req.auth.id, req.body)
      .then((result) => res.json(result))
      .catch(err => next(err));
  }
}
