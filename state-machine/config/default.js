module.exports = {
  port: 8081,
  database: {
    username:'user',
    password: 'password',
    database: 'db',
    host: 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    benchmark: true,
    logging: null
  }
}
