const express = require('express');
const servicesRouter = express.Router();

// Models
const Service = require('../models/service');

servicesRouter.get('/all', async (request, response) => {
  try {
    const services = await Service.find();
    response.status(200).json({ services });
  } catch(error) {
    response.status(404).json({error: 'Not found'});
  }
});

servicesRouter.post('/add', async (request, response) => {
  try {
    const {
      serviceId=Number(serviceId), name, description, 
      maxBookingsPerDay=Number(maxBookingsPerDay)
    } = request.body;

    const newService = new Service({
      serviceId, name, description, maxBookingsPerDay
    });
  
    await newService.save();
    response.status(200).send('New Service added!');
  } catch(error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = servicesRouter;