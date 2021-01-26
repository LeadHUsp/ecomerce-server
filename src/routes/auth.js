const express = require('express');

const { signup, signin } = require('../controller/auth');

const {
  validateSignUpRequest,
  validateSignInRequest,
  isReqestValidated,
} = require('../validators/auth');
const router = express.Router();

router.post('/signup', validateSignUpRequest, isReqestValidated, signup);
router.post('/signin', validateSignInRequest, isReqestValidated, signin);

/* router.post('/profile', requireSigin, (req, res) => {
  res.status(200).json({ user: 'profile' });
}); */

module.exports = router;
