const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://peerzadatamoor93:fortnite00@cluster0.2lsau.mongodb.net/bellstaff', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// Load routes
const routes = require('./routes/index');
app.use('/', routes);

app.listen(3003, () => console.log('Server running at http://localhost:3003'));
