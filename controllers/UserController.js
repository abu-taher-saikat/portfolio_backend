const User = require("../models/UserModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");



// Get One User
// @@ EndPoint : localhost:5000/users/signup
// @@ Method : GET
// @@ Public
exports.getOneUser = async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id).select("name email");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


// sing up route.
// @@ EndPoint : localhost:5000/users/signup
// @@ Method : POST
// @@ Public
exports.register = async (req, res, next) => {
    const searchUser = await User.find({ email: req.body.email });

    if (searchUser) {
      return res.status(409).json({
        message: "this email exist",
      });
    }

    const {
      name,
      email,
      password,
      role
  } = req.body;

  // Create user
  const user = await User.create({
      name,
      email,
      password,
      role
  })

  sendTokenResponse(user, 200, res);
};


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true
  }
  if (process.env.NODE_ENV === 'production') {
      options.secure = true
  }

  res.status(statusCode)
      .cookie('token', token, options)
      .json({
          success: true,
          token
      })
}


// login route.
// @@ EndPoint : localhost:5000/users/signup
// @@ Method : POST
// @@ Public
exports.login = async (req, res, next) => {
  try {
    const {email , password} = req.body;
    
    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success : false,
        message: "Please fill all the fields",
      });
    }

    //Check for user
    const user = await User.findOne({
        email: email
    }).select('+password');
  
    // if no user
    if (!user) {
      return res.status(400).json({
        success : false,
        message: "User not found with this email",
      });
    }
  
    // check if password matches
    const isMatch = await user.matchPassword(password);
  
    if (!isMatch) {
      return res.status(400).json({
        success : false,
        message: "Password is incorrect",
      });
    }

    sendTokenResponse(user, 200, res);

  } catch (error) {
    res.status(500).json({ error: err });
  }
};




// login route.
// @@ EndPoint : localhost:5000/users/forgetPassword
// @@ Method : POST
// @@ Public
exports.forgetPassword = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        type : "error",
        message: "User not found",
      });
    }

    const token = jwt.sign({
        email: user[0].email,
        userId: user[0]._id,
      },process.env.TOKEN_SECRET)


  } catch (error) {
    res.status(500).json({ error: err });
  }
};

