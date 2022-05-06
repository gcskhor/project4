export default function initUserModel(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      username: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      email: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      bio: {
        type: DataTypes.TEXT,
      },

      badges: {
        type: DataTypes.TEXT,
      },

      telegram_handle: {
        type: DataTypes.TEXT,
      },

      telegram_id: {
        type: DataTypes.TEXT,
      },

      restaurant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },

      visited: {
        type: DataTypes.INTEGER,
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
