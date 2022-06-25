// In this file - Building Logic
const User = require("../models/user");
const jwt = require("jsonwebtoken");


// User SignUp
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    // Error Message if the user is exist
    if (user)
      return res.status(400).json({
        message: "User Already Registered",
      });

    const { firstName, lastName, email, password } = req.body; // --- Destructure the user info sent from client-side

    // Create a new User
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error)
        return res.status(400).json({
          message: "Something went wrong",
        });

      if (data)
        return res.status(201).json({
          message: "User created succesfully",
        });
    });
  });
};


// User Signin 
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error)
      return res.status(400).json({
        message: " User not found",
      });

    if (user) {
      if (user.authenticate(req.body.password)) {  // Authenticate the user password
      
        // Generate Token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });

        const { firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  });
};
