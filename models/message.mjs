export default function initMessageModel(sequelize, DataTypes) {
  return sequelize.define(
    'message',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      restaurant_id: { // might need to change to chatroom id? see how
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },

      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      message: {
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
