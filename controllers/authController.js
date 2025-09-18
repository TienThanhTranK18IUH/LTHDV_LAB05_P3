const User = require('../models/User');

exports.getRegister = (req, res) => res.render('auth/register');
exports.getLogin = (req, res) => res.render('auth/login');

exports.postRegister = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const user = new User({ username, email, phone, password });
    await user.save();
    req.flash('success', 'Đăng ký thành công! Đăng nhập ngay.');
    res.redirect('/auth/login');
  } catch (err) {
    req.flash('error', 'Lỗi đăng ký: ' + err.message);
    res.redirect('/auth/register');
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Form data:", email, password); // debug

  const user = await User.findOne({ email });
  console.log("User found:", user);

  if (!user) {
    req.flash('error', 'Email không tồn tại');
    return res.redirect('/auth/login');
  }

  // Nếu password hoặc user.password null → báo lỗi
  if (!password || !user.password) {
    req.flash('error', 'Thiếu mật khẩu');
    return res.redirect('/auth/login');
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    req.flash('error', 'Sai mật khẩu');
    return res.redirect('/auth/login');
  }

  req.session.user = { _id: user._id, username: user.username, email: user.email };
  req.session.save(err => {
    if (err) {
      console.error(err);
      req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại');
      return res.redirect('/auth/login');
    }
    req.flash('success', 'Đăng nhập thành công!');
    res.redirect('/');
  });
};



exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
