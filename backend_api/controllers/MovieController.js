
const connection = require('../database/db.js');



function index(req, res) {
    res.json({ message: 'Movies List' })
}



function show(req, res) {
    const { id } = req.params
    res.json({ message: `Movies List with id: ${id}`})
}

module.exports = {
    index,
    show
}