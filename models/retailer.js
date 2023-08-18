const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const retailerSchema = new mongoose.Schema({
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
  firstName: {
    type: String,
    default: "",
    maxLength: 30,
  },
  lastName: {
    type: String,
    default: "",
    maxLength: 30,
  },
  middleInitial: {
    type: String,
    default: '',
    maxLength: 1,
  },
  suffix: {
    type: String,
    default: "",
    maxLength: 10
  },
  sex: {
    type: String,
    default: "",
    maxLength: 6
  },
  DOB: {
    type: Date,
  },
  phone: {
    type: String,
    maxLength: 15,
    default: "",
  },
  country: {
    type: String,
    maxLength: 15,
    default: ""
  },
  address: {
    type: String,
    default: "",
    maxLength: 100
  },
  suite: {
    type: String,
    default: "",
    maxLength: 20
  },
  city: {
    type: String,
    default: "",
    maxLength: 50
  },
  state: {
    type: String,
    default: "",
    maxLength: 20
  },
  zip: {
    type: Number,
    default: 0,
    maxLength: 10
  },


  allergies: {
    type: [String],
  },
  medicalConditions: {
    type: [String],
  },


  accountType: {
    type: String,
    default: 'retailer',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});


retailerSchema.methods.genAuthToken = function(){
  return jwt.sign({_id: this._id, email: this.email, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY)
}

const Retailer = mongoose.model("Retailer", retailerSchema);


const  validateRetailer = (retailer) => {
  const schema = {
    email: Joi.string().min(5).max(225).required(),
    password: Joi.string().min(5).max(20).required()
  }

  return Joi.validate(retailer, schema);
}

exports.Retailer = Retailer;
exports.validateRetailer = validateRetailer;
exports.retailerSchema = retailerSchema;