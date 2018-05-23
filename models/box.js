//Require mongoose
const mongoose = require("mongoose");

//Schema class
const Schema = mongoose.Schema;

//Create box schema
const BoxSchema = new Schema({
         //title is a required string
          titleArray:{
                    type: Array,
                    required: true
          },
          combined_weight:{
                    type: NumberDecimal,
                    required: true
          }
});

//Creates the Box model with the BoxSchema
const Box = mongoose.model("Book", BoxSchema);

//Exports model Box
module.exports = Box;