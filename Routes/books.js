// Use express router
const router = require('express').Router();

// Require Book model
const Book = require('../Models/book.model');

// Route for getting all the saved books from the db
// localhost:4000/books/
router.route('/').get((req, res) => {
  // Grab every document in the Articles collection
  Book.find({})
    .then(dbBook => {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbBook);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to save a book
// localhost:4000/books/
router.route('/add').post((req, res) => {
  // Creates a new note, then uses the new note id to enter in the articles notes array
  Book.create(req.body)
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to get a saved book
router.route('/:id').get((req, res) => {
  console.log('bookID', req.params.id);
  // Delete the note
  Book.findById(req.params.id)
    .then(dbBook => {
      // If we were able to successfully delete the note, send it back
      res.json(dbBook);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to Update a saved book
router.route('/update/:id').post((req, res) => {
  console.log('bookID', req.params.id);
  // Delete the note
  Book.findById(req.params.id)
    .then(dbBook => {
      dbBook.title = req.body.title;
      // res.json(req.body.title);
      dbBook.save().then(() => res.json(dbBook));
      // If we were able to successfully update a book, send it back
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to delete a saved book
router.route('/:id').delete((req, res) => {
  console.log('bookID', req.params.id);
  // Delete the note
  Book.findByIdAndDelete(req.params.id)
    .then(dbBook => {
      // If we were able to successfully delete the note, send it back
      res.json(dbBook);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

module.exports = router;
