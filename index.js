require('dotenv').config();
const { CronJob } = require('cron'); 
const cronJob =require ('./controlerr/cronjob.js')

// Log MongoDB URL
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

// Define and start the cron job
const cronsettime = new CronJob('0 0 * * *', () => {
  console.log('Cron job running every day at midnight');
  // Add your cron job logic here
});
cronsettime.start();

// Define and start the second cron job
// const jobs = new CronJob('*/60 * * * * *', async () => {
//    try {
//     await cronJob.fiveseccronjob();
//   } catch (err) {
//     console.error('Error executing cron job:', err);
//   }
// });

// jobs.start();



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
