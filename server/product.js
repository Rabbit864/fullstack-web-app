const File = require("./utils/File.js");
const fs = require("fs");

class ProductFile {
  constructor(file) {
    this.file = file; 
  }
  getProducts() {
    const products = fs.readFileSync(this.file.fileName, this.file.encoding);
    return JSON.parse(products);
  }
  getProduct(id) {
    const products = this.getProducts();
    for(let i = 0; i < products.length; i++){
      return products[i].id === id ? products[i] : false;
    }
  }
  createProduct(product){
    const products = this.getProducts();
    products.push(proudct)
    fs.writeFileSync(this.file.fileName, this.file.encoding)
  }
}

let file = new File("./products.json",'utf8');
let product = new ProductFile(file);
console.log(product.getProduct(1));

console.log()
