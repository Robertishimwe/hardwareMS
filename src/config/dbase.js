// const path = require('path');

// const Sequelize = require("sequelize")

// // module.exports = new Sequelize('defaultdb', 'avnadmin', 'AVNS_EfUj-VLFHelXr_GugKm', {
//   module.exports = new Sequelize('defaultdb', 'avnadmin', 'AVNS_EfUj-VLFHelXr_GugKm', {
//     host: 'test-robertishimwe0-5cb2.a.aivencloud.com',
//     port: 26939,
//     dialect:'mysql',
//     dialectOptions: {
//       ssl: {
//         ca: path.join(__dirname, 'ca.pem'),
//         rejectUnauthorized: false,
//       }
//     },
  
//     pool: {
//       max: 40,
//       min: 0,
//       idle: 1000000
//     },
  
//   });

// module.exports = new Sequelize('production', 'ishimwe', 'Password@123', {
//   host: 'db',
//   port: 3306,
//   dialect: 'mysql',
//   pool: {
//     max: 40,
//     min: 0,
//     idle: 1000000
//   },
// });


const path = require('path');
const Sequelize = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('development', 'avnadmin', 'AVNS_EfUj-VLFHelXr_GugKm', {
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
  // sequelize = new Sequelize('production', 'ishimwe', 'Password@123', {
  //   host: 'db',
  //   port: 3306,
  //   dialect: 'mysql',
  //   pool: {
  //     max: 40,
  //     min: 0,
  //     idle: 1000000
  //   },
  // });
} else {
  sequelize = new Sequelize('development', 'avnadmin', 'AVNS_EfUj-VLFHelXr_GugKm', {
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
}

module.exports = sequelize;

