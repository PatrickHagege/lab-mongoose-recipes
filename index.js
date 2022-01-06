const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
//console.log(data);
const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//Run your code here, after you have insured that the connection was made
let spaghetti = {
  title: "spaghetti",
  level: "Easy Peasy",
  ingredients: ["spaghetti"],
  cuisine: "italian",
  creator: "Patoche",
  created: Date.now()
}

Recipe.create(spaghetti)
  .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
  .catch(error => console.log('An error happened while saving a new urecipe:', error));

Recipe.insertMany(data/*, function(error, recipes) {console.log(recipes)}*/)
  .then(recipe => console.log('All the recipes from data.json has been saved: ', recipe))
  .catch(error => console.log('An error happened while inserting the recipes provided by data :', error));

Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  .then(recipe => console.log('Success! The recipe has been updated: ', recipe))
  .catch(error => console.log('An error happened while updating :', error));

Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(recipe => console.log('deleted'))
  .catch(error => console.log('An error happened while deleting:', error));

