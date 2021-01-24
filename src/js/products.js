import productsTemplate from '../template/products.handlebars';
import { getAllPrice, calculationPriceProduct } from './productsFunctional';
import {
  getProducts, deleteProduct, addProduct, editProduct
} from './api';

window.onload = function load() {
  async function updateUI() {
    let productElements = await getProducts();
    productElements = calculationPriceProduct(productElements);
    const allPrice = getAllPrice(productElements);
    const productsHTML = productsTemplate({ productElements, allPrice });
    document.querySelector('body').innerHTML = productsHTML;

    const buttonAdd = document.querySelector('.products__button-add');
    const modalAdd = document.querySelector('.modal--add');
    buttonAdd.addEventListener('click', () => {
      modalAdd.style.display = 'block';
    });
    const buttonCloseModal = modalAdd.querySelector('.modal-close');
    buttonCloseModal.addEventListener('click', () => {
      modalAdd.style.display = 'none';
    });
    window.onclick = function (event) {
      if (event.target === modalAdd) {
        modalAdd.style.display = 'none';
      }
    };
    const modalEdit = document.querySelector('.modal--edit');
    modalEdit
      .querySelector('.modal-close')
      .addEventListener('click', () => {
        modalEdit.style.display = 'none';
      });
    window.onclick = function (event) {
      if (event.target === modalEdit) {
        modalEdit.style.display = 'none';
      }
    };
    const formAddProduct = document.querySelector('.add-product');
    formAddProduct.onsubmit = async (e) => {
      e.preventDefault();
      const id = productElements.length === 0
        ? 1
        : productElements[productElements.length - 1].id + 1;
      const product = {
        id,
        product_name: formAddProduct.querySelector('.add-product-name').value,
        product_amount: formAddProduct.querySelector('.add-product-amount')
          .value,
        product_price: formAddProduct.querySelector('.add-product-price').value
      };
      const isAdd = await addProduct(product);
      if (isAdd) {
        alert('Продукт успешно добавлен');
      } else {
        alert('Продукт не был добавлен');
      }
      updateUI();
    };
    document.querySelectorAll('.products__button-edit').forEach((element) => {
      element.addEventListener('click', (event) => {
        const id = event.target.id.replace('edit-', '');
        const record = element.parentElement.parentElement;
        const name = record.querySelector('.products__element--name').innerHTML;
        const price = record.querySelector('.products__element--priceForOne')
          .value;
        const amount = record.querySelector('.products__element--count').value;
        modalEdit.querySelector('.edit-product-name').value = name;
        modalEdit.querySelector('.edit-product-price').value = price;
        modalEdit.querySelector('.edit-product-amount').value = amount;
        modalEdit.querySelector('.edit-product-id').value = id;
        modalEdit.style.display = 'block';
      });
    });
    const formEditProduct = document.querySelector('.edit-product');
    formEditProduct.onsubmit = async (e) => {
      e.preventDefault();
      const id = Number(formEditProduct.querySelector('.edit-product-id').value);
      const name = formEditProduct.querySelector('.edit-product-name').value;
      const amount = formEditProduct.querySelector('.edit-product-amount').value;
      const price = formEditProduct.querySelector('.edit-product-price').value;
      const product = {
        id,
        product_name: name,
        product_amount: amount,
        product_price: price
      };
      const isEdit = await editProduct(id, product);
      if (isEdit) {
        alert('Продукт успешно изменён');
      } else {
        alert('Продукт не был изменён');
      }
      updateUI();
    };
    document.querySelectorAll('.products__button-delete').forEach((element) => {
      element.addEventListener('click', async (event) => {
        const id = event.target.id.replace('delete-', '');
        const isDelete = await deleteProduct(id);
        if (isDelete) {
          alert('Продукт успешно удалён');
        } else {
          alert('Продукт не был удалён');
        }
        updateUI();
      });
    });
  }
  updateUI();
};
