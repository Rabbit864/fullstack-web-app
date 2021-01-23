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
  moduleProduct.setCountProduct(productElements[0], 4);
  moduleProduct.setCountProduct(productElements[1], 7);
  moduleProduct.setCountProduct(productElements[2], 10);
  expect(productElements[0].count).toEqual(4);
  expect(productElements[1].count).toEqual(7);
  expect(productElements[2].count).toEqual(10);
});
