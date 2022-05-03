/* eslint-disable no-unused-expressions */
const ERROR = 'error';

export default function initReviewsController(db) {
  const submitReview = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'submitReview start');

      const {
        review, title, user, restaurant,
      } = req.body;

      const newReview = await db.Review.create({
        title,
        review,
        restaurant_id: restaurant.id,
        user_id: user.id,
      });

      console.log(newReview);

      console.log('\x1b[36m%s\x1b[0m', 'submitReview end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'submitReview error');
      console.log(err);
    }
  };

  const getRestaurantReviews = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'getRestaurantReviews start');

      console.log(req.body);

      const restaurant = req.body;
      const { id } = restaurant;

      const reviews = await db.Review.findAll({
        where: {
          restaurant_id: id,
        },
        include: {
          model: db.User,
          nested: false,
        },
      });

      console.log(reviews);

      const filteredReviews = [];

      reviews.forEach((review) => {
        const filteredReview = {
          title: review.title,
          review: review.review,
          username: review.user.dataValues.username,
          createdAt: review.createdAt,
        };

        filteredReviews.push(filteredReview);
        // console.log('\x1b[36m%s\x1b[0m', filteredReview);
      });

      res.send(filteredReviews);

      console.log('\x1b[36m%s\x1b[0m', 'getRestaurantReviews end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'getRestaurantReviews error');
      console.log(err);
    }
  };

  return { submitReview, getRestaurantReviews };
}
