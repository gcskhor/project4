export default function initReviewModel(sequelize, DataTypes) {
  return sequelize.define(
    'review',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      restaurant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },

      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      review: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),

      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),

      },
    },
    {
      underscored: true,
    },
  );
}
