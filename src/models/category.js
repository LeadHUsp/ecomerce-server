const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    seo: {
      title: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      kyewords: {
        type: String,
        required: false,
      },
    },
    content: {
      type: String,
      required: false,
    },
    filters: [{ name: String, values: [String] }],
    categoryImage: { type: String },
    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
