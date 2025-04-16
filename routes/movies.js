const router = require('express').Router();
const MovieController = require('../controllers/MovieController.js');


// Index route for movies
router.get('/', MovieController.index);


// Show route for single movie
router.get('/:id', MovieController.show);

// Store a movie review
router.post('/:id/reviews', MovieController.storeReview);


// export the router istance
module.exports = router;