
const connection = require('../database/db.js');


// Index route for movies
function index(req, res) {
    //add sql query to get all books
    const sql = 'SELECT * FROM movies'
    // perform the query and return the results
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })

        console.log(results);

        res.json(results)

    })




}


// Show route for single movie
function show(req, res) {

    // take the id from the params
    const id = Number(req.params.id);

    // get the movie with the given id
    const sql = 'SELECT * FROM movies WHERE id = ?'
    const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?'
    // perform the query and return the results
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' })

        const movie = results[0]
        // get the reviews for the movie
        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: err.message })
            movie.reviews = reviews
            console.log(movie.reviews);
            // return the movie with the reviews
            res.json(movie)
        })



    })
}


// function to store a review
function storeReview(req, res) {

    // take the id from the params
    const id = Number(req.params.id);
    const { name, vote, text, created_at, updated_at } = req.body;

    console.log(id, name, vote, text, created_at, updated_at);

    const insertSql = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)'

    const values = [id, name, vote, text]

    connection.query(insertSql, values, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })


        console.log(results);
        // check if the movie exists

        res.status(201).json({ message: 'Review added successfully', rewievId: results.insertId })
    })

    

}


 function create(req, res) {

    console.log(req.body, req.file);
    //Get the data from the request

    const {title, director, genre, release_year, abstract} = req.body;
    const image = req.file.filename; 

    //prepare the sql query to insert the movie
    const sql ='INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)'
    const values = [title, director, genre, release_year, abstract, image]

    connection.query(sql, values, (err, results) => {
        if (err) return res.status(500).json({ success: false, error: err.message })
         
        console.log(results);
        return res.status(201).json({ success: true, message: 'Movie added successfully', movieId: results.insertId })
    }) 
}

module.exports = {
    index,
    show,
    storeReview,
    create
}


