const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.list = async (req, res) => {
  const { supplierId, q } = req.query;
  const filter = {};
  if (supplierId) filter.supplier = supplierId;
  if (q) filter.name = new RegExp(q, 'i');

  const products = await Product.find(filter).populate('supplier').sort('-createdAt');
  const suppliers = await Supplier.find().sort('name');
  res.render('products/index', { products, suppliers, search: q || '', selectedSupplier: supplierId || '' });
};

exports.showCreate = async (req, res) => {
  const suppliers = await Supplier.find().sort('name');
  res.render('products/form', { product: {}, suppliers });
};

exports.create = async (req, res) => {
  try {
    await Product.create(req.body);
    req.flash('success', 'Tạo sản phẩm thành công');
    res.redirect('/products');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/products');
  }
};

exports.showEdit = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find().sort('name');
  res.render('products/form', { product, suppliers });
};

exports.update = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Cập nhật thành công');
    res.redirect('/products');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/products');
  }
};

exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success', 'Xóa thành công');
  } catch (err) {
    req.flash('error', err.message);
  }
  res.redirect('/products');
};
