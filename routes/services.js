const express = require('express');
const servicesRouter = express.Router();

// Models
const Service = require('../models/service');

servicesRouter.get('/all', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch(error) {
    res.status(404).json({error: 'Not found'});
  }
});

servicesRouter.post('/add', async (req, res) => {
  try {
    const {
      serviceId=Number(serviceId), name, description, 
      maxBookingsPerDay=Number(maxBookingsPerDay)
    } = req.body;

    const newService = new Service({
      serviceId, name, description, maxBookingsPerDay
    });
  
    await newService.save();
    res.status(200).send('New Service added!');
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = servicesRouter;