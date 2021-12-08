const dotenv = require('dotenv');
dotenv.config();
// console.log(`Your Database is ${process.env.DATABASE_URL}`);

module.exports = {
    url: process.env.DATABASE_URL
  };