// server.js
require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const engine = require('ejs-mate');
const path = require('path')
const auth = require('./Routers/admin')
const product = require('./Routers/product')
const Product = require('./Models/product')
const methodOverride = require('method-override')

//Database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected!'))
    .catch((err) => console.error('Connection error:', err));

//middleware
app.engine('ejs', engine);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(options)
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// error handlers

// development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
// //API call
app.use('/api/admin', auth)
app.use('/api/products', product)

app.get('/', (req, res) => {
    res.render('pages/index')
})
app.get('/about', (req, res) => {
    res.render('pages/about')
})
app.get('/products', (req, res) => {
    res.render('pages/product')
})
app.get('/ingia', (req, res) => {
    res.render('pages/login')
})
app.get('/orders', async (req, res) => {
    const results = await Product.find({})
    try {
        res.render('pages/orders', { results })
        req.flash('success', 'successful Login')
    } catch (err) {
        console.error(err)
    }
})
// Starting the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
