const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");



const wholesalerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 5,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  businessName: {
    type: String,
    default: "",
  },
  businessType: {
    type: String,
    default: '',
  },
  businessRegNum: {
    type: String,
    default: "",
  },
  taxId: {
    type: String,
    default: "",
  },
  businessAddress: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: '',
  },


  contactName: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },


  productCategory: {
    type: String,
    default: ""
  },
  productDesc: {
    type: String,
    default: ""
  },
  brandName: {
    type: String,
    default: ""
  },
  sku: {
    type: String,
    default: ""
  },
  manufactureCountry: {
    type: String,
    default: ""
  },
  packagingDetails: {
    type: String,
    default: ""
  },



  salesChannel: {
    type: String,
    default: "",
  },
  annualSalesRevenue: {
    type: String,
    default: "",
  },
  marketPresence: {
    type: String,
    default: "",
  },



  companyOverview: {
    type: String,
    default: ""
  },
  companyDuration: {
    type: String,
    default: ""
  },
  companyMission: {
    type: String,
    default: ""
  },
  cert: {
    name: String,
    data: Buffer,
    contentType: String
  },


  warehouseLocations: {
    type: String,
    default: ""
  },
  shipmentMethod: {
    type: String,
    default: ""
  },
  returnPolicy: {
    type: String,
    default: ""
  },
  OrderFulfillmentTimeframe: {
    type: String,
    default: ""
  },
  InventoryManagementSystem: {
    type: String,
    default: ""
  },


  IntellectualPropertyRights: {
    name: String,
    data: Buffer,
    contentType: String
  },
  regulatoryCompliance: {
    name: String,
    data: Buffer,
    contentType: String
  },
  productSafetyCert: {
    name: String,
    data: Buffer,
    contentType: String
  },



  preferredPaymentTerms: {
    type: String,
    default: ""
  },
  contractualAgreement: {
    type: String,
    default: ""
  },
  specialRequirement: {
    type: String,
    default: ""
  },



  accountType: {
    type: String,
    default: 'wholesaler',
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


wholesalerSchema.methods.genAuthToken = function(){
  return jwt.sign({_id: this._id, email: this.email, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY)
}


const Wholesaler = mongoose.model("Wholesaler", wholesalerSchema);


const  validateWholesaler = (wholesaler) => {
  const schema = {
    email: Joi.string().min(5).max(225).required(),
    password: Joi.string().min(5).max(20).required()
  }
  return Joi.validate(wholesaler, schema);
}

exports.Wholesaler = Wholesaler;
exports.validateWholesaler = validateWholesaler;