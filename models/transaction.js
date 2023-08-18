const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
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
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

exports.Transaction = Transaction;