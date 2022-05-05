/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import telegramNotify from '../telebot.mjs';

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
        include: [
          {
            model: db.Restaurant,
            where: { name: restaurant.name },
            nested: false,
          },
          {
            model: db.User,
            nested: false,
          },
        ],
      });

      const filteredMessages = [];

      messages.forEach((message) => {
        const filteredMessage = {
          message: message.message,
          username: message.user.dataValues.username,
          createdAt: message.createdAt,
        };

        filteredMessages.push(filteredMessage);
      });

      res.send({ messages: filteredMessages });
      console.log('\x1b[36m%s\x1b[0m', 'getRestaurantMessages end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'getRestaurantMessages error');
      console.log(err);
    }
  };

  return { sendMessage, getRestaurantMessages };
}
