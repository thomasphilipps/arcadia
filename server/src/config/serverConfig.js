const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: 'Trop de requêtes, veuillez patienter !',
});

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to limit the number of requests
app.use(apiLimiter);

// Main route to test the server
app.get('/', (req, res) => {
  res.send('Hello Arcadia ! 😈');
});

// Middleware to handle 404 errors
app.use((req, res) => {
  const message = 'Ressource introuvable ! Essayez une autre URL.';
  res.status(404).json({ message });
});

module.exports = app;
