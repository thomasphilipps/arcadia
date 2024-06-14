const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: 'Trop de requêtes, veuillez patienter !',
});

const corsOptions = {
  origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();

// Middlewares
app.use(bodyParser.json()).use(cors(corsOptions)).use(apiLimiter);

// Main route to test the server
app.get('/', (req, res) => {
  res.send('Hello Arcadia ! 😈');
});

// API routes
require('../routes/service.routes')(app);
require('../routes/schedule.routes')(app);
require('../routes/biome.routes')(app);
require('../routes/specie.routes')(app);
require('../routes/message.routes')(app);
require('../routes/review.routes')(app);
require('../routes/login.routes')(app);
require('../routes/user.routes')(app);
require('../routes/animal.routes')(app);
require('../routes/feeding.routes')(app);
require('../routes/reports.routes')(app);
require('../routes/mailing.routes')(app);

// Middleware to handle 404 errors
app.use((req, res) => {
  const message = 'Ressource introuvable ! Essayez une autre URL.';
  res.status(404).json({ message });
});

module.exports = app;
