const router = require('express').Router();
const MovieController = require('../controllers/MovieController.js');

// Multer middleware for file uploads
 const multer = require('multer');

// Configure the storage engine
 const storage = multer.diskStorage({
    destination: 'public/images',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
})

const upload = multer({ storage: storage }) 



// Index route for movies
router.get('/', MovieController.index);


// Show route for single movie
router.get('/:id', MovieController.show);

// Store a movie review
router.post('/:id/reviews', MovieController.storeReview);

// Store a book with images
 router.post('/create', upload.single('image'), MovieController.create); 


// export the router istance
module.exports = router;