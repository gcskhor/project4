import { resolve } from 'path';

import db from './models/index.mjs';
import initRestarauntController from './controllers/restaurants.mjs';
import initUserController from './controllers/users.mjs';
import initMessagesController from './controllers/messages.mjs';
import initReviewsController from './controllers/reviews.mjs';
import initRewardsController from './controllers/rewards.mjs';

export default function routes(app) {
  const RestaurantController = initRestarauntController(db);
  const UserController = initUserController(db);
  const MessageController = initMessagesController(db);
  const ReviewController = initReviewsController(db);
  const RewardsController = initRewardsController(db);

  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.post('/restaurant', RestaurantController.findRestaurant);
  app.post('/get-checked-in-restaurant', RestaurantController.getCheckedInRestaurant);

  app.post('/login', UserController.login);
  app.post('/signup', UserController.signup);
  app.post('/logout', UserController.logout);
  app.post('/check-in', UserController.checkIn);
  app.post('/check-out', UserController.checkOut);

  app.post('/send-message', MessageController.sendMessage);
  app.post('/restaurant-messages', MessageController.getRestaurantMessages);
  app.get('/like-message/:id', MessageController.likeMessage);

  app.post('/restaurant-reviews', ReviewController.getRestaurantReviews);
  app.post('/reviews/submit', ReviewController.submitReview);

  app.get('/rewards', RewardsController.getRewards);
  app.post('/rewards/collect', RewardsController.collectRewards);

  app.get('/rewards/likes/:id', MessageController.getMessageLikes);
  app.get('/rewards/visits/:id', UserController.getVisits);
  app.get('/rewards/reviews/:id', ReviewController.getUserReviews);
}
