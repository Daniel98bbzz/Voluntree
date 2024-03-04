var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../userModel/user.js'); // Renamed User to UserModel

// POST route for user registration
router.post('/api/register', function(req, res, next) {
  const { email, username, password, role } = req.body;

  // Hash password
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    
    // Create user object with hashed password
    const userData = {
      email: email,
      username: username,
      password: hash,
      role: role
    };

    // Use the UserModel to insert the new user into the database
    UserModel.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        // Redirect or respond as necessary
        return res.redirect('/profile');
      }
    });
  });
});

// Middleware to restrict access based on user role
function requiresRole(role) {
  return function(req, res, next) {
    if (req.session.userId) {
      UserModel.findById(req.session.userId, function(err, user) {
        if (err || !user) {
          res.status(401).send('User not found');
        } else if (user.role === role) {
          next();
        } else {
          res.status(403).send('You do not have permission to perform this action');
        }
      });
    } else {
      res.status(401).send('You must be logged in');
    }
  };
}

// Add the remaining route handlers here...

module.exports = router;
