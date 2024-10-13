const mongoose = require('mongoose');
const axios = require('axios');
const Category = require('../models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connected successfully');
}).catch(error => {
  console.log("Couldn't connect to the DB", error);
});

axios.get('https://dummyjson.com/products/category-list')
  .then(async (response) => {
    const categories = response.data; // This is an array of category strings
    const categoryDocs = categories.map(category => ({ name: category })); // Convert to an array of objects
    await Category.insertMany(categoryDocs);
    console.log("Categories saved successfully!");
    mongoose.connection.close();
  })
  .catch(error => {
    console.log("Error in fetching categories or saving them", error);
  });
