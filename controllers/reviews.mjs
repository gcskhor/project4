export default function initReviewsController(db) {
  const submitReview = async (req, res) => {
    try {
      const {
        review, title, user, restaurant,
      } = req.body;

      const newReview = await db.Review.create({
        title,
        review,
        restaurant_id: restaurant.id,
        user_id: user.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getRestaurantReviews = async (req, res) => {
    try {
      const restaurant = req.body;
      const { id } = restaurant;

      const reviews = await db.Review.findAll({
        where: {
          restaurant_id: id,
        },
        order: [
          ['id', 'ASC'],
        ],
        include: {
          model: db.User,
          nested: false,
        },
      });

      const filteredReviews = [];
      reviews.forEach((review) => {
        const filteredReview = {
          title: review.title,
          review: review.review,
          username: review.user.dataValues.username,
          createdAt: review.createdAt,
        };
        filteredReviews.push(filteredReview);
      });

      res.send(filteredReviews);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserReviews = async (req, res) => {
    try {
      const { id } = req.params;
      const reviewCount = await db.Review.count({
        where: {
          user_id: id,
        },
      });
      res.send({ reviews: reviewCount });
    } catch (err) {
      console.log(err);
    }
  };

  return { submitReview, getRestaurantReviews, getUserReviews };
}
