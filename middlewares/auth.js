const jwt = require("jsonwebtoken");
const User = require('../models/UserModel');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
      res.status(401).json({
        message: "No token, authorization denied"
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed",
      error: error
    });
  }
};



// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next)=> {
      if(!roles.includes(req.user.role)){
          // return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))
          return res.status(403).json({
              success : false,
              message: `${req.user.role} role is not authorized to access this route`
          })
      }
      next();
  }
}