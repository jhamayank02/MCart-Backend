const express = require('express');
const app = express();var cors = require('cors');


const authorization = require('./authorization_routes');
const authRoutes = authorization.authRoutes;
const isLoggedIn = authorization.isLoggedIn;

const productRoutes = require('./product_routes');

const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const User = require('./Users');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
// Configure Sessions Middleware
app.use(session({
    secret: 'jkreui87340*&#kjnrf&#kkf9854',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Configure More Middleware
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/mcart', (req, res) => {
    res.send("Welcome to MCart");
})

app.use('/mcart/auth', authRoutes);

app.use('/mcart/products', productRoutes);

app.listen(80);
