const mongoose = require('mongoose');

const axios = require('axios');
const products = require('../models/Product');
const product = require('../models/Product');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

axios.get('https://dummyjson.com/products/?limit=200')
.then(async(response) =>{
  const products = response?.data?.products;
  await product.insertMany(products);
  console.log("Products saved to DB");
  mongoose.connection.close();

})
.catch((error)=>{
  console.log(error);
})
