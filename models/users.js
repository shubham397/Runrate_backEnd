var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: { 
    type: String, 
    unique: true,
    required: true,
    index: true
  },
  Password: {
    type: String,
    required: true
  },
  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  IsVerified: {
    type: Boolean,
    required: true,
    default: false
  }
});

UserSchema.index({ Email: 'text' });

module.exports = mongoose.model("user", UserSchema, "users");
