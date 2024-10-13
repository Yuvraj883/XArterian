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

router.get('/:id', async(req, res)=>{
  try{
  const product = await Product.findOne({id:req.params.id});
  if(!product){
    return res.status(404).json({message:`Product with ${req.params.id} doesn't exist!!`});

  }
  res.send(product);
}
catch(error){
  console.log(`An error occured during fetching the product with id = ${req.params.id}`, error );
  res.status(500).json({message:`Server error while fetching the product with id = ${req.params.id}`});
}
})


module.exports = router;
