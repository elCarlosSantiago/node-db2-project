const Cars = require('./cars-model');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (car) {
      req.car = car;
      next();
    } else {
      next({ message: `car with id ${req.params.id} is not found` });
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  const error = { status: 400 };
  if (vin === undefined) {
    error.message = 'Vin is missing';
  } else if (make === undefined) {
    error.message = 'make is missing';
  } else if (model === undefined) {
    error.message = 'model is missing';
  } else if (mileage === undefined) {
    error.message = 'mileage is missing';
  }

  if (error.message) {
    next(error);
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  errorHandler,
};
