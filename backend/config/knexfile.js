
require('dotenv').config({ path: '../.env' });


module.exports = ({
  development:{
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER, 
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME, 
      port: process.env.DB_PORT, 
    },
    pool:{
      min: 0,
      max: 10

    },
    ssl: { rejectUnauthorized: false },
    debug: true,
    migrations: {
      directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }

  }
   
    });
