//Dependencies
const express = require ("express");
const bodyParser = require ("body-parser");
const logger = require ("morgan");
const mongoose = require ("mongoose");
//Data model
const Book = require("./models/Book.js");
//Scrape Tool Library
const request = require("request");
const cheerio = require("cheerio");
const path = require("path");

//Have Mongoose make use of JS ES6 Promise
mongoose.Promise = Promise;

//Initialize Express
const app = express();

//Set out app to use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended:false}));

//Set public as static directory
app.use(express.static("public"));
const port = process.env.PORT || 3001;
////////////
//Database - mongoose configuration
mongoose.connect("mongodb:// ????????");
const db = mongoose.connection;
///////////

//Viewable mongoose errors
db.on("error", function(error){
          console.log("Mongoose Error: ", error);
});

//Logs success message upon login to db via mongoose
db.once("open", function(){
          console.log("Mongoose connected");
});

////////////
//Routes

//POST to create a new entry to pass req.body

//GET request to scrape HTML
const numPages = 20;
const initPage = 1;
const rootUrl = "http://jeffreynagy.com/";
const iter = (initPage + numPages -1);
app.get("/scrape", function(req, res){
          //1. grab body or section of HTML we need
          for (i=initPage; i <= iter; i++) {
                    let scrapeUrl = rootUrl + "book" + i + ".html";
                    request(scrapeUrl),  function(error, response, html){
          
                              //2. load that selection into cheerio
                              let $ = cheerio.load(html);
                              //3. now we grab each of the specific sections we need
                              let metaInfo = $("META").attr('content').str.split(",");
                              let author = metaInfo[0];
                              let title = metaInfo[1];
                              let isbn = metaInfo[3];
                              let price = $("#actualPriceValue").text();
                              let weight  = $("li: contains('Shipping Weight:')").text().slice(16).Remove(text.IndexOf(' '));
                              
                              //Empty Result Object
                              let result = {};

                              //Add Text and Info and save them as properties of results
                              result.title = title;
                              result.author = author;
                              result.price = price;
                              result.shipping_weight = weight;
                              result.isbn_10 = isbn;
                              
                              //Use Book Model to create new entries
                              //Pass the result object to the enty
                              let entry = new Book(result);

                              //Save enty to the db
                              entry.save(function(err, doc){
                                        //Log errors or the doc
                                        if (err){
                                                  console.log(err);
                                        } else {
                                                  console.log(doc);
                                        }
                              });
                    }
          }
          //Scrape complete
          res.send("scrape complete");
          res.redirect("/");
});


//GET scraped book data from mongoDB
app.get("/books", function(req, res){
          Book.find({}, function(error, doc) {
                    //Log errors or send the doc to browser
                    if (error){
                              console.log(error);
                    } else {
                              res.json(doc);
                    }
          });
});
//////////////////////////////////

//Listen to port 3001
app.listen(3001, function(){
          console.log("Running on port 3001");
});