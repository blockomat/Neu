const db = require('../db/models');
const ChrisDBApi = require('../db/api/chris');

module.exports = class ChrisService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ChrisDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let chris = await ChrisDBApi.findBy({ id }, { transaction });

      if (!chris) {
        throw new ValidationError('chrisNotFound');
      }

      await ChrisDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return chris;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await ChrisDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
