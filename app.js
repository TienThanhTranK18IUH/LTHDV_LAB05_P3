const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// routers
const suppliersRouter = require('./routes/suppliers');
app.use('/suppliers', suppliersRouter);

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
