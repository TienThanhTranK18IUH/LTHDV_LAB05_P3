module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.session.user) return next();
    req.flash('error', 'Bạn cần đăng nhập để truy cập chức năng này.');
    res.redirect('/auth/login');
  },
  ensureGuest: (req, res, next) => {
    if (!req.session.user) return next();
    res.redirect('/');
  }
};
