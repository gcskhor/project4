export default function initRewardModel(sequelize, DataTypes) {
  return sequelize.define(
    'reward',
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
