var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    // Added role to the schema
    type: String,
    enum: ["farmer", "volunteer"],
    required: true,
  },
});

// Authenticate input against database documents
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback(new Error("Password mismatch"));
      }
    });
  });
};

// Hashing password before saving to the database
UserSchema.pre("save", function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    if (user.passwordConf) {
      bcrypt.hash(user.passwordConf, 10, function (err, hashConf) {
        if (err) {
          return next(err);
        }
        user.passwordConf = hashConf;
        next();
      });
    } else {
      next();
    }
  });
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
