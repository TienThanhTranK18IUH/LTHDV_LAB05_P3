require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const morgan = require('morgan');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // 👈 thêm

const app = express();

/* ---------- Config ---------- */
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

/* ---------- Mongo ---------- */
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err));

/* ---------- Middlewares ---------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);                // 👈 thêm
app.set('layout', 'layout');            // 👈 thêm (file views/layout.ejs)

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(flash());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Gán user & flash vào res.locals
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

/* ---------- Routes ---------- */
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/suppliers', require('./routes/suppliers'));
app.use('/products', require('./routes/products'));

// 404
app.use((req, res) => res.status(404).render('404'));

/* ---------- Start ---------- */
app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT}`));
