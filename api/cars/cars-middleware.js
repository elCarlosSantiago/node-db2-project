const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (car) {
      req.car = car;
      next();
    } else {
      next({ message: `car with id ${req.params.id} is not found`, status: 404 });
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  const error = { status: 400 };
  if (vin === undefined) {
    error.message = 'vin is missing';
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
  const isVinValid = vinValidator.validate(req.body.vin);
  if (isVinValid) {
    next();
  } else {
    next({ message: `vin ${req.body.vin} is invalid`, status: 400 });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const car = await Cars.getByVin(req.body.vin);
    if (!car) {
      next();
    } else {
      next({ message: `vin ${req.body.vin} already exists`, status: 400 });
    }
  } catch (err) {
    next(err);
  }
};

//eslint-disable-next-line
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
