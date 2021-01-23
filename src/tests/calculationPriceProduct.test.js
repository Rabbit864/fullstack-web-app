const moduleProduct = require('../js/productsFunctional');

test('check the receipt of the full cost of each product', () => {
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
  const products = moduleProduct.calculationPriceProduct(productElements);
  expect(products[0].priceTotal).toBe(2000);
  expect(products[1].priceTotal).toBe(2000);
  expect(products[2].priceTotal).toBe(1000);
  expect(products).toHaveLength(3);
});
