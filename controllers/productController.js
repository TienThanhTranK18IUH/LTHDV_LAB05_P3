const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const products = await Product.find().populate('supplier');
  res.render('products/index', { products });
};

exports.newForm = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/form', { product: {}, suppliers });
};

exports.create = async (req, res) => {
  try {
    await Product.create(req.body);
    req.flash('success', 'Thêm sản phẩm thành công');
    res.redirect('/products');
  } catch (err) {
    req.flash('error', 'Lỗi: ' + err.message);
    res.redirect('/products');
  }
};

exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render('products/form', { product, suppliers });
};

exports.update = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Cập nhật thành công');
    res.redirect('/products');
  } catch (err) {
    req.flash('error', 'Lỗi: ' + err.message);
    res.redirect('/products');
  }
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash('success', 'Đã xóa');
  res.redirect('/products');
};
