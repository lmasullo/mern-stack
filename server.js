//! Dependencies ************************************************
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize Express Server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Set port
const PORT = process.env.PORT || 4000;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Sets the root route to /todos, all others are based on this
// const bookRoutes = express.Router();
// app.use('/books', bookRoutes);

//! Connect to the Mongo DB **********************************************
// If deployed, use the deployed database. Otherwise use the local database
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

// Connect to the db
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    // View the added result in the console
    console.log('MongoDB database connection established successfully');
  })
  .catch(function(err) {
    // If an error occurred, log it
    console.log(err);
  });

// Require routes
const booksRoutes = require('./Routes/books');

// Sets the base route as localhost:4000/books
// All routes will be off books
app.use('/books', booksRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//! Start the server **********************************************
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`);
});
