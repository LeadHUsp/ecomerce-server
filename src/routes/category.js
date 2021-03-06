const express = require('express');
const { requireSigin, adminMiddleware } = require('../common-middleware');

const { addCategory, getCategories } = require('../controller/category');

const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});
const upload = multer({ storage });
router.post(
  '/category/create',
  requireSigin,
  adminMiddleware,
  upload.single('categoryImage'),
  addCategory
);
router.get('/category/', getCategories);

module.exports = router;
