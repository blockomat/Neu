const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const chris = sequelize.define(
    'chris',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  chris.associate = (db) => {
    db.chris.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.chris.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return chris;
};
