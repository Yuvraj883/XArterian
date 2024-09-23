import { addToCart } from "./scripts/addToCart.js";
const URL = 'https://dummyjson.com/products/?limit=20';

let products;

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    products = data.products;
    console.log(products);
    const template = document.querySelector('#product-card');
    const productList = document.querySelector('#product-list');
    products.forEach(product => {
      const productNode = template.content.cloneNode(true);

      productNode.querySelector('#product-title').textContent = product?.title || 'N/A';
      productNode.querySelector('#product-description').textContent = product?.description || 'No description available';
      productNode.querySelector('#product-brand').textContent = product?.brand;
      const discountedPrice = product.price * (1 - product.discountPercentage / 100);
      productNode.querySelector('#product-price').textContent = `$ ${discountedPrice.toFixed(2)}`;
      productNode.querySelector('#product-actual-price').textContent = `$${product?.price.toFixed(2)}`;
      productNode.querySelector('#product-img').src = product?.thumbnail || 'default-image.jpg';
      productNode.querySelector('#product-rating').textContent = `${product.rating} ⭐`;
      productNode.querySelector('#product-page-link').href=`./pages/product.html?id=${product?.id}`

      const tagsContainer = productNode.querySelector('#product-tags');

      product?.tags.forEach(tag=>{
        const tagElement = document.createElement('p');
        tagElement.textContent = tag;
        tagElement.classList.add('border-2', 'px-2', 'py-1', 'border-black', 'm-1', 'rounded-md' );
        tagsContainer.appendChild(tagElement);

      })

      productNode.querySelector('.add-to-cart').addEventListener('click', ()=>{

        const id = product.id;
        const productTitle = product?.title
        const productThumbnail = product?.thumbnail;
        const productPrice = product?.thumbnail;
        let quantity =1;

        addToCart(id, productTitle, productThumbnail, productPrice, quantity);
      })

      productList.append(productNode);
    });
  })
  .catch((e) => {
    console.error('Error fetching products:', e);
  });


const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
mobileMenu.classList.toggle('hidden');
})



