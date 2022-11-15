const express = require('express');
const server = express();
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
require('dotenv').config();

if (server.get('env') !== 'production') {
  server.use(morgan('tiny'));
}

connectDB();

server.use(express.json({ extended: true }));

// Routers
const userRoutes = require('./routes/users');

const apiUrl = process.env.API_URL;

// Routes
server.use(apiUrl, userRoutes);

// Custom error handler
server.use(errorHandler);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`[PORT:${port}] | The server is up and running...`);
});
