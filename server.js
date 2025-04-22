const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const MoviesRouter = require('./routes/movies.js');
const serverError = require('./middleware/ServerError.js');
const notFound = require('./middleware/notFound.js');

//Auth dependencies
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./auth/passport-config.js');

// Initialize passport
initializePassport(passport);

//Initialize session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}))



// Middleware 
// cors middleware
app.use(cors(
    {
        origin: process.env.FRONT_URL || 'http://localhost:5173',
        credentials: true,
    }
));


// body parser
app.use(express.json());


// static assets mniddleware
app.use(express.static('public'));






// Routes

app.get('/', (req, res) =>{
    res.json('Movies API Server')
})

// use the movies router
app.use('/api/v1/movies', MoviesRouter);



// Authentication routes
app.post('/register', passport.authenticate('register'),(req, res)=>{
    return res.json({message: 'User registered successfully', user: req.user});
})

app.post('/login', passport.authenticate('login'), (req, res) => {
    return res.json({ message: 'User Logged in successfully', user: req.user });
 
})


//Middleware for server errors
app.use(serverError);


// Middleware for 404 errors
app.use(notFound);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});