const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const azzaihSchema = new Schema({
  name: String,
  URL: String,
});


// Create a model based on that schema
const azzaih = mongoose.model("azzaih", azzaihSchema);


// export the model
module.exports = azzaih;