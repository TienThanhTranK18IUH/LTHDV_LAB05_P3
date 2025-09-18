const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('suppliers/index', { suppliers });
};

exports.newForm = (req, res) => res.render('suppliers/form', { supplier: {} });

exports.create = async (req, res) => {
  try {
    await Supplier.create(req.body);
    req.flash('success', 'Thêm nhà cung cấp thành công');
    res.redirect('/suppliers');
  } catch (err) {
    req.flash('error', 'Lỗi: ' + err.message);
    res.redirect('/suppliers');
  }
};

exports.editForm = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render('suppliers/form', { supplier });
};

exports.update = async (req, res) => {
  try {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Cập nhật thành công');
    res.redirect('/suppliers');
  } catch (err) {
    req.flash('error', 'Lỗi: ' + err.message);
    res.redirect('/suppliers');
  }
};

exports.delete = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  req.flash('success', 'Đã xóa');
  res.redirect('/suppliers');
};
