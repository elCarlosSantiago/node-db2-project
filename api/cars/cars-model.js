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

const updateById = async (id, car) => {
  await db('cars').where('car_id', id).update(car);
  return getById(id);
};

const deleteById = async (id) => {
  const toBeDeleted = await getById(id);
  await db('cars').where('car_id', id).del();
  return toBeDeleted;
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
  updateById,
  deleteById
};
