const fs = require("fs");

class ProductFileModel {
  constructor(filename, encoding) {
    this.fileName = filename;
    this.encoding = encoding;
     try {
      const products = fs.readFileSync(this.fileName, this.encoding);
      this.products = JSON.parse(products);
    } catch (e) {
      this.products = false;
    }
  }

  getProduct(id) {
    if (this.products === false) {
      return false;
    }
    const product = this.products.find((product) => product.id === id);
    if (product === undefined) {
      return false;
    }
    return product;
  }

  createProduct(product) {
    if (this.products === false) {
      return false;
    }
    this.products.push(product);
    fs.writeFileSync(this.fileName, JSON.stringify(this.products));
    return true;
  }
  updateProduct(id, newProduct) {
    if (this.products === false) {
      return false;
    }
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products[i] = newProduct;
        fs.writeFileSync(this.fileName, JSON.stringify(this.products));
        return true;
      }
    }
    return false;
  }
  deleteProduct(id) {
    if (this.products === false) {
      return false;
    }
    const indexDeleteProduct = this.products.findIndex(
      (product) => product.id === id
    );
    if (indexDeleteProduct === -1) {
      return false;
    }
    this.products.splice(indexDeleteProduct, 1);
    fs.writeFileSync(this.fileName, JSON.stringify(this.products));
    return true;
  }
}

module.exports = ProductFileModel;
