const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const MoviesRouter = require('./routes/movies.js');
const serverError = require('./middleware/ServerError.js');
const notFound = require('./middleware/notFound.js');


// Middleware 

// cors middleware
app.use(cors(
    {
        origin: process.env.FRONT_URL || 'http://localhost:5173',
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
app.post('/register', (req, res)=>{

    //get the data from the body
    const data = req.body;
    console.log(data);

    res.json(data, 'Registering ...')
})

app.post('/login', (req, res) => {

    //get the data from the body
    const data = req.body;
    console.log(data, 'Logging in ...');

    res.json(data)
})


//Middleware for server errors
app.use(serverError);


// Middleware for 404 errors
app.use(notFound);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});