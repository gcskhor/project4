export default function initRestaurantModel(sequelize, DataTypes) {
  return sequelize.define(
    'restaurant',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      name: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true,
      },

      address: {
        type: DataTypes.TEXT,
      },

      visited_count: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      place_data: {
        type: DataTypes.JSON,
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
