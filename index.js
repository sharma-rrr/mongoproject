require('dotenv').config();
console.log('MONGO_URL:', process.env.MONGO_URL);

// Initialize DB Connection
require('./config/database');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userroutes = require('./routes/user.routes');

const server = express();

// For security
server.use(helmet());

// Enable CORS
const corsOptions = {
  origin: '*',
};
server.use(cors(corsOptions));

// Body parsing middleware
server.use(express.json());

// Routes
server.use('/api/v1/auth', userroutes);

const config = require('./config/config').getConfig();
const PORT = config.PORT;

console.log('✔ Bootstrapping Application');
console.log(`✔ Mode: ${config.MODE}`);
console.log(`✔ Port: ${PORT}`);

server.listen(PORT, () => {
  console.log(`✔ Application Started on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.log('✘ Application failed to start');
  console.error('✘', err.message);
  process.exit(1);
});

module.exports = { server };
