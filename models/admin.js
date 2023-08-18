const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 225
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1000
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});


adminSchema.methods.genAuthToken = function(){
  return jwt.sign({_id: this._id, email: this.email, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY)
}

const Admin = mongoose.model("Admin", adminSchema);


const  validateAdmin = (admin) => {
  const schema = {
    email: Joi.string().min(5).max(225).required(),
    password: Joi.string().min(5).max(20).required()
  }

  return Joi.validate(admin, schema);
}

exports.Admin = Admin;
exports.validateAdmin = validateAdmin;
exports.AdminSchema = adminSchema;