const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_Secret = 'Tushaisagoodgi$rl';

//ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check whether user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400).json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //   .then(user => res.json(user))
      //   .catch(err => {console.log(err),
      // res.json({error: 'Please enter a unique value for email', message: err.message})});

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_Secret);

      // res.json(user);
      res.json({authtoken})
    //   Catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
  }
);

//ROUTE 1: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
  ],
  async(req, res)=>{
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const {email, password} =req.body;
    try {
      const user = await User.findOne({email});

      if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
      const passwordCompare = bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_Secret);
      res.json({authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

  //ROUTE 3: Get loggedin User using: POST "/api/auth/getuser". Login required
  router.post('/getuser', fetchuser, async (req, res) => {
    try{
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

module.exports = router
