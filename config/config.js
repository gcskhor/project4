module.exports = {
  development: {
    username: process.env.USERNAME,
    password: null,
    database: 'whatsup_development',
    host: process.env.HOST,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: { // https://github.com/sequelize/sequelize/issues/12083
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
