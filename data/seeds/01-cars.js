exports.seed = function (knex) {
  return knex('cars')
    .truncate()
    .then(function () {
      return knex('cars').insert([
        { vin: '4S3BJ6321N6900903', make: 'Toyota', model:'Prado', mileage: 50000, title: 'toyota es toyota bro', transmission:'standard' },
        { vin: '1G4CU5312N1625421', make: 'Jeep', model:'Liberty', mileage: 10000, title: 'lease is up dog', transmission:'standard' },
        { vin: 'JH4KA3171KC016159', make: 'Mercedes', model:'G-Wagon', mileage: 0, title: 'German cars', transmission:'4-wd' },
      ]);
    });
};
