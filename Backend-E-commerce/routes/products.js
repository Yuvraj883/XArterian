const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

//Get all products

router.get('/', async (req, res)=>{
  try{
    const products = await Product.find();
    res.send(products);
  }
  catch(error){
    console.log("An error occured");
  }
})


module.exports = router; 
