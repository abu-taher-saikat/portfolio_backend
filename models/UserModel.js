const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, required: true, unique: true ,
    match : [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      'Please add a valid email..'
  ]},
  password: { 
    type: String, 
    required: true ,         
    minlength: 6,
    select : false
  },
  role : {
    type: String,
    enum : ['admin','customer', 'guest'],
    default :  'customer'
  },
  resetPasswordToken : String,
  resetPasswordExpire : Date,
  createdAt: { type: Date, default: Date.now }
});



// Encrypt password using bcrypt... 
userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
      next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

// Sign JWT and return 
userSchema.methods.getSignedJwtToken = function(){
  console.log(process.env.JWT_EXPIRE)
  return jwt.sign({id : this._id}, process.env.JWT_SECRET, {
      expiresIn : "1h"
  });
}

// Match user entered password to hashed password in database. 
userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}



// Generate and hash password token
userSchema.methods.getResetPasswordToken = function(){
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  console.log(resetToken);

  // Hash token ans set to resetPasswordToken field
  this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
}

module.exports = mongoose.model("User", userSchema);
