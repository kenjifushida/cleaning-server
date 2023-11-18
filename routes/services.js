const express = require('express');
const servicesRouter = express.Router();

// Models
const Service = require('../models/service');
// Error Handling
const { ERROR_CODES } = require('../constants');

servicesRouter.get('/all', async (request, response) => {
  try {
    const services = await Service.find();
    response.status(200).json({ services });
  } catch(error) {
    response.status(ERROR_CODES.NOT_FOUND).json({error: 'Not found'});
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
    response.status(ERROR_CODES.BAD_REQUEST).json({ error: error.message });
  }
});

module.exports = servicesRouter;