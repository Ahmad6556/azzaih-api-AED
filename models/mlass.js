const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const azzaihSchema = new Schema({
    name: String
});


// Create a model based on that schema
const azzaih = mongoose.model("mullas", azzaihSchema);


// export the model
module.exports = azzaih;