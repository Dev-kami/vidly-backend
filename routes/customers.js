const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

// Get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  if (!customers) res.status(404).send("No customer was found");

  res.send(customers);
});

// Add new customers
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  customer = await customer.save();
  res.send(customer);
});

// Get customer by ID
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    res.status(400).send("The customer with the ID does not exist!!");

  res.send(customer);
});

// Update an existing customer
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  error && res.status(400).send(error.message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.send(customer);
});

// Delete an existing customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    res.status(400).send("The customer with this ID does not exist!!");

  res.send(customer);
});

module.exports = router;
