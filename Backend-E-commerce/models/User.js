const mongoose = require('mongoose');

const userSchema = new mongoose.schema({
  name:{
    type:String,
    require
  },
  email:{
    type:String,
    require
  },
  password:{
    type:String,
    require
  }
})

const user = mongoose.model('user', userSchema);
module.exports = user;
