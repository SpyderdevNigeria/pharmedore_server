const express = require('express');
const router = express.Router();
const { Transaction } = require('../models/transaction');
const { Prescription } = require('../models/prescription');

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});

router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.send(transaction);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


router.post('/', async(req, res) => {
  const { user, drugList, status } = req.body;
  const transaction = new Transaction(req.body);

  try {
    if (status === 'success') {
      const hasOTC = drugList.some(drug => !drug.OTC);
      if (hasOTC) {
        const prescription = await Prescription.find({userId: user.id});
        prescription.purchased = true;
        await prescription.save();
      }
    }
    const newTransaction = await transaction.save();
    res.send(newTransaction);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});