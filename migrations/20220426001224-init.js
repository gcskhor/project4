module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      place_data: {
        type: Sequelize.JSON,
      },

      visited_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });

    await queryInterface.createTable('users', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      username: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      password: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      email: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      bio: {
        type: Sequelize.TEXT,
      },

      badges: {
        type: Sequelize.TEXT,
      },

      telegram_handle: {
        type: Sequelize.TEXT,
      },

      telegram_id: {
        type: Sequelize.TEXT,
      },

      restaurant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });

    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      restaurant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      title: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      review: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });

    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      restaurant_id: { // might need to change to chatroom id? see how
        type: Sequelize.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      likes: {
        type: Sequelize.INTEGER,
      },

      message: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('rewards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('user_rewards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      reward_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rewards',
          key: 'id',
        },
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_rewards');
    await queryInterface.dropTable('rewards');

    await queryInterface.dropTable('reviews');
    await queryInterface.dropTable('messages');

    await queryInterface.dropTable('users');
    await queryInterface.dropTable('restaurants');
  },
};
