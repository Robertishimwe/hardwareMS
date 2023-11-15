const Sequelize = require("sequelize")
module.exports = new Sequelize('defaultdb', 'avnadmin', 'AVNS_EfUj-VLFHelXr_GugKm', {
    host: 'test-robertishimwe0-5cb2.a.aivencloud.com',
    dialect:'mysql',
  
    pool: {
      max: 40,
      min: 0,
      idle: 1000000
    },
  
  });