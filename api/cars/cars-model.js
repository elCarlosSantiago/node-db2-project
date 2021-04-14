const db = require('../../data/db-config.js');

const getAll = () => {
  return db('cars');
};

const getById = (id) => {
  return db('cars').where('car_id', id).first();
};

const create = async (car) => {
  const [id] = await db('cars').insert(car, ['cara_id']);
  return getById(id);
};

const getByVin = async (vin) => {
  return db('cars').where({ vin }).first();
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};
