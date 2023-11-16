const path = require('path');

const Sequelize = require("sequelize")
module.exports = new Sequelize('defaultdb', 'avnadmin', 'AVNS_EfUj-VLFHelXr_GugKm', {
    host: 'test-robertishimwe0-5cb2.a.aivencloud.com',
    port: 26939,
    dialect:'mysql',
    dialectOptions: {
      ssl: {
        ca: path.join(__dirname, 'ca.pem'),
        rejectUnauthorized: false,
      }
    },
  
    pool: {
      max: 40,
      min: 0,
      idle: 1000000
    },
  
  });