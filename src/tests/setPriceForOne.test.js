const moduleProduct = require('../js/productsFunctional');

test('check count setting for products', () => {
  const productElements = [
    {
      id: 1,
      name: 'Молоко',
      count: 40,
      priceForOne: 50
    },
    {
      id: 2,
      name: 'Хлеб',
      count: 100,
      priceForOne: 20
    },
    {
      id: 3,
      name: 'Лук',
      count: 200,
      priceForOne: 5
    }
  ];
  moduleProduct.setPriceForOne(productElements[0], 12);
  moduleProduct.setPriceForOne(productElements[1], 5);
  moduleProduct.setPriceForOne(productElements[2], 75);
  expect(productElements[0].priceForOne).toEqual(12);
  expect(productElements[1].priceForOne).toEqual(5);
  expect(productElements[2].priceForOne).toEqual(75);
});
