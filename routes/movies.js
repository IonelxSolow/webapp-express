const router = require('express').Router();
const MovieController = require('../controllers/MovieController.js');


// Index route for movies
router.get('/', MovieController.index);


// Show route for single movie
router.get('/:id', MovieController.show);



module.exports = router;