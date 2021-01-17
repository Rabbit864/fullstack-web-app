const fs = require("fs");

class ProductFile {
  constructor(filename, encoding) {
    this.fileName = filename;
    this.encoding = encoding;
  }

  getProducts() {
    const products = fs.readFileSync(this.fileName, this.encoding);
    return JSON.parse(products);
  }

  getProduct(id) {
    const products = this.getProducts();
    for (let i = 0; i < products.length; i++) {
      return products[i].id === id ? products[i] : false;
    }
  }

  createProduct(product) {
    const products = this.getProducts();
    products.push(product);
    fs.writeFileSync(this.fileName, JSON.stringify(products));
    return true;
  }
  updateProduct(id, newProduct) {
    const products = this.getProducts();
    for (let i = 0; i < products.length; i++) {
      if(products[i].id === id){
        products[i] = newProduct;
        fs.writeFileSync(this.fileName, JSON.stringify(products));
        return true;
      }
    }
    return false;
  }
  deleteProduct(id){
    const products = this.getProducts();
    for (let i = 0; i < products.length; i++) {
      if(products[i].id === id){
        products.splice(i,1);
        fs.writeFileSync(this.fileName, JSON.stringify(products));
        return true;
      }
    }
    return false;
  }
}
