const slugify = require('slugify');
const Category = require('../models/category');

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      seo: {
        title: cat.seo.title,
        description: cat.seo.description,
        kyewords: cat.seo.kyewords,
      },
      content: cat.content,
      children: createCategories(categories, cat._id),
      filters: cat.filters,
    });
  }
  return categoryList;
}
exports.addCategory = (req, res) => {
  let categoryUrl;

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    filters: req.body.filters,
    seo: req.body.seo,
    content: req.body.content,
  };
  if (req.file) {
    categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (category) {
      return res.status(201).json({
        category,
      });
    }
  });
};
exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(201).json({
        categoryList,
      });
    }
  });
};
