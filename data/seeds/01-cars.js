exports.seed = function (knex) {
  return knex('cars')
    .truncate()
    .then(function () {
      return knex('cars').insert([
        { vin: '12345', make: 'Toyota', model:'Prado', mileage: 50000, title: 'toyota es toyota bro', transmission:'standard' },
        { vin: '23456', make: 'Jeep', model:'Liberty', mileage: 10000, title: 'lease is up dog', transmission:'standard' },
        { vin: '34567', make: 'Mercedes', model:'G-Wagon', mileage: 0, title: 'German cars', transmission:'4-wd' },
      ]);
    });
};
