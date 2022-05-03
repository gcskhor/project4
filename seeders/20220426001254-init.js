module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('this happened');
    const seedRestaurants = [
      {
        name: '69 some road, test-restaurant, singapore',
        address: '69 some road',
        visited_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '420 other road, test-restaurant2, singapore',
        address: '420 other road',
        visited_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Adam Road, Adam Road Food Centre, Singapore',
        address: '2 Adam Rd, Singapore 289876',
        visited_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      }];

    await queryInterface.bulkInsert('restaurants', seedRestaurants);

    const seedUsers = [
      {
        username: 'Test_User_A',
        password: '9ab15bec3f9d2f9f3bb9c651c6a27ce5df06b5d9936b2016d6f23c8d45c13b016b2dbb6ac9d412f59eb7d1c40ed5b637b52fab0806839325ead003b7873c4cc0',
        email: 'a',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Test_User_B',
        password: 'd1f455971cb56a34331e80848b839f55aff94be2753b4fa2fb3a15e530fb75f45bbd374966c8cb174ba08d980689e594ae5977ba7518c346ee31f6cfc660c281',
        email: 'b',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Test_User_C',
        password: 'b5f9644e031142a1c75358a47224d5919a4aef0dc03ff4dfe7de8db7902fb7d64a6e9e6eaf5429a77b2a2a02025d83c9bc000f6990d950ff24a8d8c621ea51f4',
        email: 'c',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', seedUsers);

    const seedReviews = [
      {
        restaurant_id: 3,
        user_id: 1,
        title: 'AmAzIng :O',
        review: 'Wow that was so good, gr8 stuff bro',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 3,
        user_id: 2,
        title: 'Best place ever',
        review: 'wew will defo go back again!!! 11/10',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('reviews', seedReviews);

    const seedMessages = [
      {
        restaurant_id: 3,
        user_id: 2,
        message: 'Anybody around? I wanna eat nasi lemak',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        restaurant_id: 3,
        user_id: 3,
        message: 'Queued up for 1hr bro, want me to dabao for you?',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('messages', seedMessages);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('restaurants');
    await queryInterface.bulkDelete('users');
  },
};
