/* eslint-disable no-unused-expressions */
const ERROR = 'error';

export default function initRestarauntController(db) {
  const findRestaurant = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'findRestaurant start');
      console.log(req.body);
      const { restaurantName, address } = req.body;
      const restaurant = await db.Restaurant.findOne({
        where: {
          name: restaurantName,
        },
      });

      if (!restaurant) {
        const newRestaurant = await db.Restaurant.create({
          name: restaurantName,
          address,
        });

        newRestaurant
          ? res.send(newRestaurant)
          : res.status(500).send(ERROR);
      }

      else {
        res.send(restaurant);
      }

      console.log('\x1b[36m%s\x1b[0m', 'findRestaurant end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'findRestaurant error');
      console.log(err);
    }
  };

  const getCheckedInRestaurant = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'getCheckedInRestaurant start');
      console.log(req.body);

      const { restaurantId } = req.body;

      const restaurant = await db.Restaurant.findOne({
        where: {
          id: restaurantId,
        },
      });

      const restaurantData = restaurant.dataValues;

      res.send(restaurantData);

      console.log('\x1b[36m%s\x1b[0m', 'getCheckedInRestaurant end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'getCheckedInRestaurant error');
      console.log(err);
    }
  };

  return { findRestaurant, getCheckedInRestaurant };
}
