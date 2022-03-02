var mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: { 
    type: String, 
    required: true,
    index: true
  },
  Phone: {
    type: String,
    required: true
  },
  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

ContactSchema.index({ Email: 'text' });

module.exports = mongoose.model("contact", ContactSchema, "contacts");