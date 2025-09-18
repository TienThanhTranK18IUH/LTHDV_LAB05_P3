const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  const suppliers = await Supplier.find().sort('name');
  // show featured / latest products
  const products = await Product.find().populate('supplier').sort('-createdAt').limit(12);
  res.render('index', { suppliers, products });
});

module.exports = router;
