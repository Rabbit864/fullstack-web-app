const fs = require("fs");

class ProductFile {
  constructor(filename, encoding) {
    this.fileName = filename;
    this.encoding = encoding;
  }

  getProducts() {
    try {
      const products = fs.readFileSync(this.fileName, this.encoding);
      return JSON.parse(products);
    } catch (e) {
      return false;
    }
  }

  getProduct(id) {
    const products = this.getProducts();
    if (products === false) {
      return false;
    }
    const product = products.find((product) => product.id === id);
    if (product === undefined) {
      return false;
    }
    return product;
  }

  createProduct(product) {
    const products = this.getProducts();
    if (products === false) {
      return false;
    }
    products.push(product);
    fs.writeFileSync(this.fileName, JSON.stringify(products));
    return true;
  }
  updateProduct(id, newProduct) {
    const products = this.getProducts();
    if (products === false) {
      return false;
    }
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products[i] = newProduct;
        fs.writeFileSync(this.fileName, JSON.stringify(products));
        return true;
      }
    }
    return false;
  }
  deleteProduct(id) {
    const products = this.getProducts();
    if (products === false) {
      return false;
    }
    const indexDeleteProduct = products.findIndex(
      (product) => product.id === id
    );
    if (indexDeleteProduct === -1) {
      return false;
    }
    products.splice(indexDeleteProduct, 1);
    fs.writeFileSync(this.fileName, JSON.stringify(products));
    return true;
  }
}
