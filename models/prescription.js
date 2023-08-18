const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  drugList: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  purchased: {
    type: Boolean,
    default: false
  }
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

exports.Prescription = Prescription;