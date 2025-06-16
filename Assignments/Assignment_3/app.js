const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// Load routes
const routes = require('./routes/index');
app.use('/', routes);

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
