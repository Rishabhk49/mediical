// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const serviceRoutes = require('./Routes/ServiceRoutes');
const dotenv = require('dotenv');

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// MongoDB connection using environment variable for the connection string
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Use the routes
app.use('/api', serviceRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
