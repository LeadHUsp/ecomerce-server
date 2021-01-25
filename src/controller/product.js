const Product = require('../models/product');
const slugify = require('slugify');

const shortid = require('shortid');

exports.createProduct = (req, res, next) => {
  //res.status(200).json({ file: req.files, body: req.body });
  const { name, price, quantity, description, category } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name: req.body.name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    offer: req.offer | null,
    createdBy: req.user._id,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(200).json({ product });
    }
  });
};
