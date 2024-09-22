const URL = 'https://dummyjson.com/products';

let products;

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    products = data.products;
    const template = document.querySelector('#product-card');
    const productList = document.querySelector('#product-list');
    products.forEach(product => {
      const productNode = template.content.cloneNode(true);
      productNode.querySelector('#product-title').textContent = product?.name || 'N/A';
      productNode.querySelector('#product-description').textContent = product?.description || 'No description available';

      const discountedPrice = product.price * (1 - product.discountPercentage / 100);
      productNode.querySelector('#product-price').textContent = discountedPrice.toFixed(2);
      productNode.querySelector('#product-actual-price').textContent = product?.price.toFixed(2);
      productNode.querySelector('#product-img').src = product?.images[0] || 'default-image.jpg';
      productNode.querySelector('#product-rating').textContent = `${product.rating} ⭐`;

      productList.append(productNode);
    });
  })
  .catch((e) => {
    console.error('Error fetching products:', e);
  });
