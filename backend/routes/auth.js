const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Ceate a user using: POST "/api/auth/createuser". No Login Required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
] ,async (req, res) => {
  // If there are errors, return Bad Request and the Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check wether the user with this email exists already
    let user = User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "Sorry a user with this email already exists"})
    }
     user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    
//     .then(user => res.json(user))
//     .catch(err => {console.log(err)
//         res.json({error: 'Please Enter a Unique Value', message: err.message})
//     });
})

module.exports = router