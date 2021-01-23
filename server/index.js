const express = require("express");
const ProductFileModel = require("./product");
const path = require("path");
const productModel = new ProductFileModel('server/products.json', "utf8");
const app = express();
const port = 80;

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

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
    return res.status(404).json({ error: "Product not found" });
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
  const id = req.params.id;
  if (!/\d+/g.test(id)) {
    return res
      .status(400)
      .json({ error: `Incorrect parametr ${id}, expected number` });
  }
  if (productModel.updateProduct(+id, req.body)) {
    res.json({ result: "ok" });
  } else {
    res.json({ error: "Failed to update product" });
  }
});

app.delete("/product/:id", (req, res) => {
  const id = req.params.id;
  if (!/\d+/g.test(id)) {
    return res
      .status(400)
      .json({ error: `Incorrect parametr ${id}, expected number` });
  }
  if (productModel.deleteProduct(+id)) {
    res.json({ result: "ok" });
  } else {
    res.json({ error: "Failed to delete product" });
  }
});

app.listen(port, (err) => {
  if (err) return console.log("something bad happened", err);
  console.log(`server is listening ${port}`);
});
