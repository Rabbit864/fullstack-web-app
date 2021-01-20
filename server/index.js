const express = require("express");
const ProductFileModel = require("./product");
const productModel = new ProductFileModel("./products.json", "utf8");
const app = express();
const port = 80;

app.use(express.json());

app.get("/products", (req, res) => {
  res.json(productModel.products);
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  if (!/\d+/g.test(id)) {
    return res
      .status(400)
      .json({ error: `Incorrect parametr ${id}, expected number` });
  }
  const product = productModel.getProduct(+id);
  if (product === false) {
    return res.status(404).json({ massage: "Product not found" });
  }
  res.json(product);
});

app.post("/product", (req, res) => {
  if (productModel.createProduct(req.body)) {
    res.json({ result: "ok" });
  } else {
    res.json({ error: "Failed to create product" });
  }
});

app.put("/product/:id", (req, res) => {
  if (productModel.updateProduct(+req.params.id, req.body)) {
    res.json({ result: "ok" });
  } else {
    res.json({ error: "Failed to update product" });
  }
});

app.delete("/product/:id", (req, res) => {
  if (productModel.deleteProduct(+req.params.id)) {
    res.json({ result: "ok" });
  } else {
    res.json({ error: "Failed to delete product" });
  }
});

app.listen(port, (err) => {
  if (err) return console.log("something bad happened", err);
  console.log(`server is listening ${port}`);
});
