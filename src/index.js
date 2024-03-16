const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');
const routes = require('./routes');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

const db = require('./config/dbase');
const createAdminUser = require('./config/createAdmin');

// Enable CORS for all domains
app.use(cors());

// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers for each CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  db.authenticate()
    .then(() => {
      console.log('Database synced');
      createAdminUser();
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in worker ${process.pid}`);
      });
    })
    .catch((err) => {
      console.error('Database connection failed:', err);
    });
}



















































// const express = require('express');
// const routes = require('./routes');

// const app = express();

// const db = require('./config/dbase')
// const createAdminUser = require('./config/createAdmin')

// app.use(express.json());
// app.use('/api', routes);

// const PORT = process.env.PORT || 3000


// db.authenticate().then(() => {
//     console.log('Database synced');
//     createAdminUser()
//     app.listen(PORT, () => {
//         console.log('Server is running on port 3000');
//     });
// }).catch((e) => {
//     console.log(e)
// });