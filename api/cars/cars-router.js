const router = require('express').Router();
const Cars = require('./cars-model');
const md = require('./cars-middleware');

router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', md.checkCarId, async (req, res) => {
  res.json(req.car);
});

router.post(
  '/',
  md.checkCarPayload,
  md.checkVinNumberValid,
  md.checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

// router.put('/:id', async (req, res, next) => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// });
// router.delete('/:id', async (req, res, next) => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// });

router.use(md.errorHandler);

module.exports = router;
