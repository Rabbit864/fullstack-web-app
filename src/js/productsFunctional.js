/*
eslint no-return-assign: "error"
*/
export function getPriceTotal(product) {
  return product.product_price * product.product_amount;
}

export function getAllPrice(products) {
  const reducer = (accumulator, currentValue) => accumulator + getPriceTotal(currentValue);
  return products.reduce(reducer, 0);
}

export function calculationPriceProduct(products) {
  products.forEach((product) => (product.priceTotal = getPriceTotal(product)));
  return products;
}

export function setCountProduct(product, count) {
  product.count = count;
}

export function setPriceForOne(product, priceForOne) {
  product.priceForOne = priceForOne;
}
