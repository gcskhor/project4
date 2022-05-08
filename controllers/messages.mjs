/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import telegramNotify from '../telebot.mjs';
import { sequelize } from '../models/index.mjs';

const ERROR = 'error';

export default function initMessagesController(db) {
  const sendMessage = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'sendMessage start');
      // console.log(req.body);
      const {
        username, userId, message, likes, restaurant,
      } = req.body;

      const restaurantId = restaurant.id;

      const newMessage = await db.Message.create({
        message,
        user_id: userId,
        restaurant_id: restaurantId,
      });

      // QUERY DB USERS TABLE IF ANY PEOPLE ARE CHECKED-IN TO THAT RESTAURANT.
      const checkedInUsers = await db.User.findAll({
        where: {
          restaurant_id: restaurantId,
        },
      });

      // SEND A TELEGRAM MESSAGE TO ALL USERS IN THAT RESTAURANT
      checkedInUsers.forEach((user) => {
        console.log(user.dataValues);
        const { telegram_id } = user.dataValues;
        console.log(telegram_id);

        const messageToSend = `<i>${username} posted in <b>${restaurant.name}</b>:</i>\n\n${message}`;

        telegram_id && telegramNotify(telegram_id, messageToSend);
      });

      console.log('\x1b[36m%s\x1b[0m', 'sendMessage end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'sendMessage error');
      console.log(err);
    }
  };

  const getRestaurantMessages = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'getRestaurantMessages start');

      console.log(req.body);

      const restaurant = req.body;

      const messages = await db.Message.findAll({
        order: [
          ['id', 'ASC'],
        ],
        include: [
          {
            model: db.Restaurant,
            where: { name: restaurant.name },
            nested: false,
          },
          {
            model: db.User,
            nested: false,
            include: {
              model: db.Reward,
              nested: true,
            },
          },
        ],
      });

      // console.log(messages);

      const filteredMessages = [];

      messages.forEach((message) => {
        const filteredMessage = {
          id: message.id,
          message: message.message,
          likes: message.likes,
          username: message.user.dataValues.username,
          user_id: message.user.dataValues.id,
          createdAt: message.createdAt,
          user_rewards: message.user.rewards,
        };

        filteredMessages.push(filteredMessage);
      });

      console.log(filteredMessages);

      res.send({ messages: filteredMessages });
      console.log('\x1b[36m%s\x1b[0m', 'getRestaurantMessages end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'getRestaurantMessages error');
      console.log(err);
    }
  };

  const likeMessage = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'likeMessage start');

      console.log(req.params);

      const { id } = req.params;

      const updatedMessage = await db.Message.increment('likes', {
        by: 1,
        where: { id },
      });

      console.log('\x1b[36m%s\x1b[0m', 'likeMessage end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'likeMessage error');
      console.log(err);
    }
  };

  const getMessageLikes = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'getMessageLikes start');

      console.log(req.params);
      const { id } = req.params;

      const totalMessageLikes = await db.Message.findAll({
        where: {
          user_id: id,
        },
        attributes: [
          'user_id',
          [sequelize.fn('sum', sequelize.col('likes')), 'total_likes'],
        ],
        group: ['user_id'],
      });

      // console.log(totalMessageLikes);
      // console.log(totalMessageLikes[0].dataValues.total_likes);

      if (!totalMessageLikes[0]) {
        res.send({ likes: 0 });
      } else {
        res.send({ likes: totalMessageLikes[0].dataValues.total_likes });
      }

      console.log('\x1b[36m%s\x1b[0m', 'getMessageLikes end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'getMessageLikes error');
      console.log(err);
    }
  };

  return {
    sendMessage, getRestaurantMessages, likeMessage, getMessageLikes,
  };
}
