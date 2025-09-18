const User = require('../models/User');

exports.showRegister = (req, res) => res.render('register');
exports.showLogin = (req, res) => res.render('login');

exports.register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const passwordHash = await User.hashPassword(password);
    const user = new User({ username, passwordHash, email, phone });
    await user.save();
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Đăng ký thất bại: ' + (err.message || ''));
    res.redirect('/auth/register');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      req.flash('error', 'Tài khoản không tồn tại');
      return res.redirect('/auth/login');
    }
    const valid = await user.verifyPassword(password);
    if (!valid) {
      req.flash('error', 'Sai mật khẩu');
      return res.redirect('/auth/login');
    }
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
};

// Simple forgot password (demo) -> In production use email with token.
// Here we just render a form and pretend.
exports.showForgot = (req, res) => res.render('forgot');
exports.forgot = (req, res) => {
  // Implement: create token, send email via nodemailer, etc.
  req.flash('info', 'Nếu email tồn tại, hướng dẫn đã được gửi (demo).');
  res.redirect('/auth/login');
};
