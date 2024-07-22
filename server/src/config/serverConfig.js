const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000,
  message: 'Trop de requêtes, veuillez patienter !',
  validate: { xForwardedForHeader: false },
});

const allowedOrigins = process.env.FRONTEND_URL.split(',').map((url) => url.trim());

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const app = express();

// Middlewares
app.use(cors(corsOptions)).use(bodyParser.json()).use(apiLimiter);

// Main route to test the server
app.get('/', (req, res) => {
  res.json('Hello Arcadia ! 😈');
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
require('../routes/image.routes')(app);

// Middleware to handle 404 errors
app.use((req, res) => {
  const message = 'Ressource introuvable ! Essayez une autre URL.';
  res.status(404).json({ message });
});

module.exports = app;
