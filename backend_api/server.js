const express = require('express');
const cors = require('cors');
const app = express();


const PORT = process.env.PORT || 3000;


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


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});



// Routes

app.get('/', (req, res) =>{
    res.json('Movies API Server')
})


// Index route for movies
app.get('/api/v1/movies', (req,res)=> {

    res.json({message: 'Movies LIST'})
})


// Show route for single movie
app.get('/api/v1/movies/:id', (req, res) => {

    const { id } = req.params
    res.json({ message: `List movie with id ${id}` })
})



//Middleware for server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


// Middleware for 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});
