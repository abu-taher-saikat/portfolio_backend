const User = require("../models/UserModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');




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

    console.log(searchUser);
    if (searchUser.length > 0) {
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



// updatePassword
// @@ EndPoint : localhost:5000/users/updatePassword
// @@ Method : POST
// @@ Public
exports.updatePassword = async (req, res, next) => {
  try {
    console.log(req.userData.id);
    const user = await User.findById(req.userData.id).select('+password');

    console.log('user is', user);

    // Check current password 
    if(!(await user.matchPassword(req.body.currentPassword))){
        res.status(400).json({
            success : false,
            message: "Current password is incorrect",
        })
    }else{
      user.password = req.body.newPassword;
      await user.save();

      sendTokenResponse(user, 200, res);
    }


  } catch (error) {
    res.status(500).json({ error: error });
  }
};






// @desc   Forgot password This is the PART 1.
// @route  POST /api/v1/auth/forgotpassword
// @access Public
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({
      email: req.body.email
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found with this email",
    });
  }

  // Get rest token
  const resetToken = user.getResetPasswordToken();

  await user.save({
      validateBeforeSave: false
  });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are reciving this email because you(or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
      await sendEmail({
          email: user.email,
          subject: 'Password reset token',
          message,
      })
      res.status(200).json({
          success: true,
          data: 'Email sent'
      });
  } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({
          validateBeforeSave: false
      });

      res.status(500).json({
          success: false,
          message: 'Email could not be sent',
      });
    }
};


// @desc   Reset password This is the PART 2.
// @route  PUT /api/v1/auth/resetpassword/:resettoken
// @access Public
exports.resetPassword = async (req, res, next) => {
  // Get hashed token 
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

  const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire : {$gt : Date.now()}
  });

  if(!user){
      return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendTokenResponse(user, 200, res);
}