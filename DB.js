const {Sequelize} = require("sequelize")

module.exports = new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    dialect:'postgres',
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialectOptions: {
        ssl: {
          require: true, // Require SSL connection
          rejectUnauthorized: false, // You might need this option if the SSL certificate is self-signed
        },
      },
})