//Require mongoose
const mongoose = require("mongoose");

//Schema class
const Schema = mongoose.Schema;

//Create book schema
const BookSchema = new Schema({
          title:{
                    type: String,
                    required: true
          },
          author:{
                    type: String,
                    required: true
          },
          price:{
                    type: NumberDecimal,
                    currency: "USD",
                    required: true
          },
          shipping_weight:{
                    type: NumberDecimal,
                    required: true
          },
          isbn_10:{
                    type: String,
                    required: true
          }
});

//Creates the Book model with the BookSchema
const Book = mongoose.model("Book", BookSchema);

//Exports model Book
module.exports = Book;