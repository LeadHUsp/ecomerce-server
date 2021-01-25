const express = require('express');
const { signup, signin, verifyToken } = require('../../controller/admin/auth');
const {
  validateSignUpRequest,
  validateSignInRequest,
  isReqestValidated,
} = require('../../validators/auth');
const router = express.Router();

router.post('/admin/signup', validateSignUpRequest, isReqestValidated, signup);
router.post('/admin/signin', validateSignInRequest, isReqestValidated, signin);
router.post('/admin/verify', verifyToken);

module.exports = router;
