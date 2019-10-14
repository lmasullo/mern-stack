const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const { Schema } = mongoose;
//! Fix validation
// {
//     type: String,
//     required: true,
//     trim: true,
//   }
// ,
//   {
//     timestamps: true,
//   }

// Using the Schema constructor, create a new BookSchema object
const BookSchema = new Schema({
  title: String,
  authors: [String],
  description: String,
  image: String,
  link: String,
});

// This creates our model from the above schema, using mongoose's model method
const Book = mongoose.model('Book', BookSchema);

// Export the Note model
module.exports = Book;
