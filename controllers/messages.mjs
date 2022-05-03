/* eslint-disable no-unused-expressions */
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

      // console.log(messages);

      const filteredMessages = [];

      messages.forEach((message) => {
        const filteredMessage = {
          message: message.message,
          username: message.user.dataValues.username,
          createdAt: message.createdAt,
        };

        filteredMessages.push(filteredMessage);
        // console.log('\x1b[36m%s\x1b[0m', filteredMessage);
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
