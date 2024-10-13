
const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

router.get('/', async(req, res)=>{
  try{
  const categories = await Category.find();
  if(!categories){
    return res.status(404).json({message:"Category list doesn't exist"});
  }
  res.send(categories);
}
catch(error){
  console.log(error);
}
})

module.exports = router;
