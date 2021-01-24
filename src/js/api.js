export async function getProducts() {
  try {
    const url = 'http://localhost:80/products';
    const response = await fetch(url);
    const products = await response.json();
    return products;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deleteProduct(id) {
  try {
    const url = `http://localhost:80/product/${id}`;
    const response = await fetch(url, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function addProduct(product) {
  try {
    const url = 'http://localhost:80/product';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(product)
    });
    return response.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editProduct(id, product) {
  try {
    const url = `http://localhost:80/product/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(product)
    });
    return response.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}
