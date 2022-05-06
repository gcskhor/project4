import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import initUserModel from './user.mjs';
import initRestaurantModel from './restaurant.mjs';
import initReviewModel from './review.mjs';
import initRewardModel from './reward.mjs';
import initMessageModel from './message.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Restaurant = initRestaurantModel(sequelize, Sequelize.DataTypes);
db.Review = initReviewModel(sequelize, Sequelize.DataTypes);
db.Reward = initRewardModel(sequelize, Sequelize.DataTypes);
db.Message = initMessageModel(sequelize, Sequelize.DataTypes);

db.Review.belongsTo(db.Restaurant);
db.Restaurant.hasMany(db.Review);

db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

db.Reward.belongsToMany(db.User, { through: 'user_rewards' });
db.User.belongsToMany(db.Reward, { through: 'user_rewards' });

db.User.hasMany(db.Message);
db.Message.belongsTo(db.User);
db.Restaurant.hasMany(db.Message);
db.Message.belongsTo(db.Restaurant);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

export { sequelize };
