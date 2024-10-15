import { addToCart } from './scripts/addToCart.js';
import {jwtDecode} from 'jwt-decode';

// import {verifyAuth} from './scripts/verifyAuthStatus.js'

//API Calling
// const URL = 'https://dummyjson.com/products/?limit=12'
const URL = 'https://x-arterian.vercel.app/api/products/?limit=12'

const searchQuery = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-icon')
searchQuery.value = ''
searchBtn.addEventListener('click', () => {
  filterProducts(searchQuery.value)
})

let products = []

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    products = data
    console.log(data)
    if (searchQuery.value == '') {
      displayProducts(products)
      return
    }
  })
  .catch((e) => {
    console.error('Error fetching products:', e)
  })

function displayProducts(productsOnDisplay) {
  const template = document.querySelector('#product-card')
  const productList = document.querySelector('#product-list')
  productList.innerHTML = ''
  productsOnDisplay.forEach((product) => {
    const productNode = template.content.cloneNode(true)

    productNode.querySelector('#product-title').textContent =
      product?.title || 'N/A'
    productNode.querySelector('#product-description').textContent =
      product?.description || 'No description available'
    productNode.querySelector('#product-brand').textContent = product?.brand
    const discountedPrice =
      product.price * (1 - product.discountPercentage / 100)
    productNode.querySelector(
      '#product-price'
    ).textContent = `$ ${discountedPrice.toFixed(2)}`
    productNode.querySelector(
      '#product-actual-price'
    ).textContent = `$${product?.price.toFixed(2)}`
    productNode.querySelector('#product-img').src =
      product?.thumbnail || 'default-image.jpg'
    productNode.querySelector(
      '#product-rating'
    ).textContent = `${product.rating} ⭐`
    productNode.querySelector(
      '#product-page-link'
    ).href = `./pages/product.html?id=${product?.id}`

    const tagsContainer = productNode.querySelector('#product-tags')

    product?.tags.forEach((tag) => {
      const tagElement = document.createElement('p')
      tagElement.textContent = tag
      tagElement.classList.add(
        'border-2',
        'px-2',
        'py-1',
        'border-black',
        'm-1',
        'rounded-md'
      )
      tagsContainer.appendChild(tagElement)
    })

    productNode.querySelector('.add-to-cart').addEventListener('click', () => {
      const id = product.id
      const productTitle = product?.title
      const productThumbnail = product?.thumbnail
      const productPrice = product?.price
      let quantity = 1

      addToCart(id, productTitle, productThumbnail, productPrice, quantity)
    })

    productList.append(productNode)
  })
}

function filterProducts(query) {
  if (!products || products.length === 0) {
    console.log('Products are not available...')
    return
  }

  const filteredProducts = products?.filter((product) => {
    return product?.title.toLowerCase().includes(query.toLowerCase())
  })
  console.log(filteredProducts)
  displayProducts(filteredProducts)
}

searchQuery.addEventListener('input', () => {
  filterProducts(searchQuery.value)
})

const menuToggle = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden')
})

const menu = document.getElementById('menu');




const token = localStorage.getItem('token');

const user = jwtDecode(token);
console.log(user.id);
console.log(user.name);

if(user.name){
  const name = document.createElement('li');
  name.textContent = user.name;
  menu.appendChild(name);
  const name2 = document.createElement('li');
  name2.textContent = user.name;
  mobileMenu.appendChild(name2);
}

