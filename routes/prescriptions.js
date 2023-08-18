const express = require('express');
const router = express.Router();
const { Prescription } = require('../models/prescription');
const multer = require('multer');

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })


router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.send(prescriptions);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});

router.get('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    res.send(prescription);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});

// send mail to admin for approval


router.post('/', async(req, res) => {
  const prescription = new Prescription(req.body);
  try {
    const newPrescription = await prescription.save();
    res.send(newPrescription);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});



router.put('/:id', async (req, res) => {;
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedPrescription);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


module.exports = router;