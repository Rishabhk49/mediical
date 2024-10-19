const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Add a new service
router.post('/services', async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Basic validation
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const newService = new Service({
            name,
            description,
            price
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all services
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a service
router.put('/services/:id', async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Basic validation
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { name, description, price },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a service
router.delete('/services/:id', async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);

        if (!deletedService) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
