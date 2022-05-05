/* eslint-disable no-unused-expressions */
import axios from 'axios';

const ERROR = 'error';

export default function initRestarauntController(db) {
  const findRestaurant = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'findRestaurant start');
      console.log(req.body);

      const { restaurantName, address, placeId } = req.body;

      const restaurant = await db.Restaurant.findOne({
        where: {
          name: restaurantName,
        },
      });

      if (!restaurant) {
        let restaurantJson = null;

        // AXIOS CALL TO GOOGLE PLACE DETAILS API TO GET BIZ DATA
        await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name%2Crating%2Cformatted_phone_number%2Cbusiness_status%2Cgeometry%2Copening_hours%2Cphotos%2Crating&key=AIzaSyAvFStCxa8h0bJEyVvKKe93gCUsEcJYZO4`)
          .then((response) => {
            console.log('📙📙📙📙📙📙📙');
            console.log(response.data.result);

            restaurantJson = response.data.result;

            console.log('📙📙📙📙📙📙📙');
          }).catch((err) => {
            console.log(err);
          });

        const newRestaurant = await db.Restaurant.create({
          name: restaurantName,
          address,
          place_data: restaurantJson,
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
