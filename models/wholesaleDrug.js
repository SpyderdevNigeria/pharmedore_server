const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  drugCompany: {
    type: String,
    required: true,
  },
  drugName: {
    type: String,
    required: true,
  },
  genericName: {
    type: String,
  },
  category: {
    type: String,
  },
  OTC: {
    type: Boolean,
  },

  forms: [
    {
      form: {
        type: String,
      },
      price: {
        type: Number,
      },
    }
  ],

  strengths: [
    {
      strength: {
        type: String,
      },
      pricePercent: {
        type: Number,
      },
    }
  ],

  images: [{
    url: {
      type: String,
    }
  }],

  description: {
    type: String,
  }
});



const WholesaleDrug = mongoose.model("WholesaleDrug", drugSchema);

module.exports = WholesaleDrug;