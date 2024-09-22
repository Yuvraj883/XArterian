const path = window.location.search;
const urlParams = new URLSearchParams(path);
const productId = urlParams.get('id');


const URL = `https://dummyjson.com/products/${productId}`;

let productDetails;

fetch(URL).then((res)=>{
  return res.json();
}).then(data=>{
  productDetails = data;
  const productDetailsPage = document.querySelector('#product-details-page');
  const template = document.querySelector('#product-details');
  const productNode = template.content.cloneNode(true);
  const discountedPrice = productDetails.price * (1 - productDetails.discountPercentage / 100);

  productNode.querySelector('#product-img').src= productDetails?.images[0];
  // productNode.querySelector("#product-").textContent = productDetails?.
  productNode.querySelector("#product-title").textContent = productDetails?.title
  productNode.querySelector("#product-brand").textContent = productDetails?.brand
  productNode.querySelector("#product-price").textContent = `$${discountedPrice.toFixed(2)}`;
  productNode.querySelector("#product-actual-price").textContent = `$${productDetails?.price}`;
  productNode.querySelector('#product-availability').textContent = productDetails?.availabilityStatus;
  productNode.querySelector("#product-description").textContent = productDetails?.description;
  productNode.querySelector('#product-stock').textContent = `Only ${productDetails?.stock} left in stock`;


  const tagsContainer = productNode.querySelector('#product-tags');

      productDetails?.tags.forEach(tag=>{
        const tagElement = document.createElement('p');
        tagElement.textContent = tag;
        tagElement.classList.add('border-2', 'px-2', 'py-1', 'border-black', 'mr-2', 'rounded-md' );
        tagsContainer.appendChild(tagElement);

      })

  productDetailsPage.append(productNode);


  console.log(data);
}).catch(e=>{
  console.log("Error occured while fetching product details", e);
});



