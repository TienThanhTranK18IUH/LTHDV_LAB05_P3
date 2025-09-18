const Supplier = require('../models/Supplier'); // import model

exports.list = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', {
      suppliers,
      title: 'Danh sách nhà cung cấp'  // truyền title cho layout
    });
  } catch (err) {
    console.error(err);
    res.send('Có lỗi xảy ra');
  }
};
