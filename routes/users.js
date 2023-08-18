const bcrypt = require('bcrypt')
const express = require('express')
const { Retailer, validateRetailer } = require("../models/retailer")
const { Wholesaler, validateWholesaler } = require("../models/wholesaler")
const Otp = require("../models/otp")
const { welcomeMail, passwordReset, verifyMail, otpMail } = require("../utils/mailer")
const { validateAdmin, Admin } = require('../models/admin')

const router  = express.Router()



// verify email
router.post("/retailer/verifyMail/", async (req, res) => {
  const { email } = req.body
  if(!email) return res.status(400).send({message: "Invalid email"})

  const retailer = await Retailer.findOne({ email })
  if(!retailer) return res.status(400).send({message: "user not found"})
  
  try{
    retailer.isVerified = true
    await retailer.save()
    res.send(retailer)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


router.post("/wholesaler/verifyMail/", async (req, res) => {
  const { email } = req.body
  if(!email) return res.status(400).send({message: "Invalid email"})

  console.log(email)

  const wholesaler = await Wholesaler.findOne({ email })
  if(!wholesaler) return res.status(400).send({message: "user not found"})
  
  try{
    wholesaler.isVerified = true
    await wholesaler.save()
    res.send(wholesaler)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// get retailer by email
router.get("/getRetailer/:email", async (req, res) => {
  const { email } = req.params
  if(!email) return res.status(400).send({message: "Invalid email"})

  try{
    const retailer = await Retailer.findOne({ email })
    if(!retailer) return res.status(400).send({message: "Invalid email"})
    res.send(retailer)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// get wholesaler by email
router.get("/getWholesaler/:email", async (req, res) => {
  const { email } = req.params
  if(!email) return res.status(400).send({message: "Invalid email"})

  try{
    const wholesaler = await Wholesaler.findOne({ email })
    if(!wholesaler) return res.status(400).send({message: "Invalid email"})
    res.send(wholesaler)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


router.post("/retailer/signup/", async (req, res) => {
  const { error } = validateRetailer(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  
  let retailer = await Retailer.findOne({ email: req.body.email })
  if(retailer) return res.status(400).send({message: "User already registered"})
  
  try{
    retailer = new Retailer(req.body)
    const salt = await bcrypt.genSalt(10)
    retailer.password = await bcrypt.hash(retailer.password, salt)
    await retailer.save()
    const token = retailer.genAuthToken()

    verifyMail(retailer.email, retailer.accountType)

    res.send({message: 'success'})
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})



router.post("/wholesaler/signup", async (req, res) => {
  const { error } = validateWholesaler(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  let wholesaler = await Wholesaler.findOne({ email: req.body.email })
  if(wholesaler) return res.status(400).send({message: "User already registered"})

  try{
    wholesaler = new Wholesaler(req.body)
    const salt = await bcrypt.genSalt(10)
    wholesaler.password = await bcrypt.hash(wholesaler.password, salt)
    await wholesaler.save()
    const token = wholesaler.genAuthToken()

    verifyMail(wholesaler.email, wholesaler.accountType)
    res.send({message: 'success'})
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


router.post("/retailer/login", async (req, res) => {
  const { error } = validateRetailer(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  try{
    let retailer = await Retailer.findOne({ email: req.body.email })
    if(!retailer) return res.status(400).send({message: "Invalid email"})

    const validPassword = await bcrypt.compare(req.body.password, retailer.password)
    if(!validPassword) return res.status(400).send({message: "Invalid password"})
    const otp = await new Otp({email: retailer.email}).save()

    otpMail(retailer.email, otp.code)
    res.send({message: 'success'})
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


router.post("/wholesaler/login", async (req, res) => {
  const { error } = validateWholesaler(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  try{
    let wholesaler = await Wholesaler.findOne({ email: req.body.email })
    if(!wholesaler) return res.status(400).send("Invalid email")

    const validPassword = await bcrypt.compare(req.body.password, wholesaler.password)
    if(!validPassword) return res.status(400).send("Invalid password")

    const otp = await new Otp({email: wholesaler.email}).save()

    otpMail(wholesaler.email, otp.code)
    res.send({message: 'success'})
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})





// otp verification
router.post("/otp/retailer", async (req, res) => {
  const { code } = req.body
  if(!code) return res.status(400).send({message: "Invalid code"})

  try{
    const otp = await Otp.findOne({ code })
    if(!otp) return res.status(400).send({message: "Invalid code"})
  
    const retailer = await Retailer.findOne({ email: otp.email })
    if(!retailer) return res.status(400).send({message: "Invalid email"})
    // const token = retailer.genAuthToken()
    res.send(retailer)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})



router.post("/otp/wholesaler", async (req, res) => {
  const { code } = req.body
  if(!code) return res.status(400).send({message: "Invalid code"})

  try{
    const otp = await Otp.findOne({ code })
    if(!otp) return res.status(400).send({message: "Invalid code"})
  
    const wholesaler = await Wholesaler.findOne({ email: otp.email })
    if(!wholesaler) return res.status(400).send({message: "Invalid email"})
    res.send(wholesaler)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// update retailer
router.put("/updateProfile/retailer/:id", async (req, res) => {
  const { id } = req.params
  const { firstName, lastName, middleInitial, suffix, DOB, sex, phone, address, city, state, zip, allergies, medicalConditions } = req.body
  if(!id) return res.status(400).send({message: "Invalid id"})

  let retailer = await Retailer.findById(id)
  if(!retailer) return res.status(400).send({message: "user not found"})
  try{
    retailer.firstName = firstName
    retailer.lastName = lastName
    retailer.middleInitial = middleInitial
    retailer.suffix = suffix
    retailer.DOB = DOB
    retailer.sex = sex
    retailer.phone = phone
    retailer.address = address
    retailer.city = city
    retailer.state = state
    retailer.zip = zip
    retailer.allergies = allergies
    retailer.medicalConditions = medicalConditions
    await retailer.save()
    res.send(retailer)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


// update wholesaler
router.put("/updateProfile/wholesaler/:id", async (req, res) => {
  const { id } = req.params
  if(!id) return res.status(400).send({message: "Invalid id"})
  const {
    businessName, businessType, businessRegNum, businessAddress, taxId, url, 
    contactName, phone, suffix, productCategory, productDesc, brandName,
    manufactureCountry, packagingDetails, salesChannel, annualSalesRevenue, 
    marketPresence, companyMission, companyOverview, companyDuration,
    warehouseLocations, shipmentMethod, returnPolicy, OrderFulfillmentTimeframe,
    InventoryManagementSystem, preferredPaymentTerms, contractualAgreement, 
    specialRequirement,
  } = req.body

  let wholesaler = await Wholesaler.findById(id)
  if(!wholesaler) return res.status(400).send({message: "user not found"})

  try{
    wholesaler.businessName = businessName
    wholesaler.businessType = businessType
    wholesaler.businessRegNum = businessRegNum
    wholesaler.businessAddress = businessAddress
    wholesaler.taxId = taxId
    wholesaler.url = url
    wholesaler.contactName = contactName
    wholesaler.phone = phone
    wholesaler.suffix = suffix
    wholesaler.productCategory = productCategory
    wholesaler.productDesc = productDesc
    wholesaler.brandName = brandName
    wholesaler.manufactureCountry = manufactureCountry
    wholesaler.packagingDetails = packagingDetails
    wholesaler.salesChannel = salesChannel
    wholesaler.annualSalesRevenue = annualSalesRevenue
    wholesaler.marketPresence = marketPresence
    wholesaler.companyMission = companyMission
    wholesaler.companyOverview = companyOverview
    wholesaler.companyDuration = companyDuration
    wholesaler.warehouseLocations = warehouseLocations
    wholesaler.shipmentMethod = shipmentMethod
    wholesaler.returnPolicy = returnPolicy
    wholesaler.OrderFulfillmentTimeframe = OrderFulfillmentTimeframe
    wholesaler.InventoryManagementSystem = InventoryManagementSystem
    wholesaler.preferredPaymentTerms = preferredPaymentTerms
    wholesaler.contractualAgreement = contractualAgreement
    wholesaler.specialRequirement = specialRequirement
    await wholesaler.save()
    res.send(wholesaler)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})



//delete account for retailer
router.delete("/delete/retailer/:id", async (req, res) => {
  const { id } = req.params
  if(!id) return res.status(400).send({message: "Invalid id"})

  try{
    const retailer = await Retailer.findByIdAndDelete(id)
    if(!retailer) return res.status(400).send({message: "user not found"})
    res.send({message: "user deleted"})
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


//delete account for wholesaler
router.delete("/delete/wholesaler/:id", async (req, res) => {
  const { id } = req.params
  if(!id) return res.status(400).send({message: "Invalid id"})
  try{
    const wholesaler = await Wholesaler.findByIdAndDelete(id)
    if(!wholesaler) return res.status(400).send({message: "user not found"})
    res.send(wholesaler)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


//forgot password
router.get("/forgot-password/:email", async (req, res) => {
  const { email } = req.params
  if(!email) return res.status(400).send({message: "Invalid email"})
  try{
    // send the email
    passwordReset(email)
    res.send({message: "email sent"})
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


//reset password for retailer
router.put("/reset-password/retailer/", async (req, res) => {
  const { email, password } = req.body
  if(!email) return res.status(400).send({message: "Invalid email"})
  if(!password) return res.status(400).send({message: "Invalid password"})
  
  try{
    const retailer = await Retailer.findOne({email})
    if(!retailer) return res.status(400).send({message: "user not found"})

    const salt = await bcrypt.genSalt(10)
    retailer.password = await bcrypt.hash(password, salt)
    await retailer.save()
    res.send(retailer)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


//reset password for wholesaler
router.put("/reset-password/wholesaler/", async (req, res) => {
  const { email, password } = req.body
  if(!email) return res.status(400).send({message: "Invalid email"})
  if(!password) return res.status(400).send({message: "Invalid password"})

  try{
    const wholesaler = await Wholesaler.findOne({email})
    if(!wholesaler) return res.status(400).send({message: "user not found"})

    const salt = await bcrypt.genSalt(10)
    wholesaler.password = await bcrypt.hash(password, salt)
    await wholesaler.save()
    res.send(wholesaler)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})



//admin sign up
router.post("/admin/signup", async (req, res) => {
  const { email, password } = req.body
  const { error } = validateAdmin(req.body)
  if(error) return res.status(400).send({message: error.details[0].message})

  if(!email) return res.status(400).send({message: "Invalid email"})
  if(!password) return res.status(400).send({message: "Invalid password"})

  try{
    const admin = new Admin({email, password})
    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(password, salt)
    await admin.save()
    res.send(admin)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


//admin login
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body
  const { error } = validateAdmin(req.body) 
  if(error) return res.status(400).send({message: error.details[0].message})

  if(!email) return res.status(400).send({message: "Invalid email"})
  if(!password) return res.status(400).send({message: "Invalid password"})

  try{  
    const admin = await Admin.findOne({email})
    if(!admin) return res.status(400).send({message: "Invalid email"})
    const validPassword = await bcrypt.compare(password, admin.password)
    if(!validPassword) return res.status(400).send({message: "Invalid password"})
    res.send(admin)
  } catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})


module.exports = router