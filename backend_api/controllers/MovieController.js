
const connection = require('../database/db.js');



function index(req, res) {
      //add sql query to get all books
    const sql = 'SELECT * FROM movies'
      // perform the query and return the results
    connection.query(sql, (err, results) => {
        if(err) return res.status(500).json({ error: err.message })

            console.log(results);

        res.json(results)

    })




}



function show(req, res) {

    // take the id from the params
    const  id  = Number(req.params.id);
   
    // get the movie with the given id
    const sql = 'SELECT * FROM movies WHERE id = ?'
    connection.query(sql, [id], (err, results) => {
    if(err) return res.status(500).json({ error: err.message })
    if(results.length === 0) return res.status(404).json({ error: 'Movie not found' })

        const movie = results[0]

    res.json(movie)
})
}



module.exports = {
    index,
    show
}