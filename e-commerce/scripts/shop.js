import { addToCart } from '../scripts/addToCart.js'
// import {verifyAuth} from './scripts/verifyAuthStatus.js'

//API Calling
const categoryURL = 'https://x-arterian.vercel.app/api/categories';

const URL = 'https://x-arterian.vercel.app/api/products/?limit=120';

const productsPerPage = 12
let currentPage = 1

const searchQuery = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-icon')

searchBtn.addEventListener('click', () => {
  filterProducts(searchQuery.value)
})

let products = []

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    products = data
    console.log(products)
    setUpPagination(products)
    paginate(currentPage, products)

    if (searchQuery.value === '') {
      return
    }
  })
  .catch((e) => {
    console.error('Error fetching products:', e)
  })

let filteredCategoryProducts = products

//************Pagination *****************/

function paginate(currPage, productsList) {
  if (!products || products.length === 0) {
    return
  }
  const startIndex = (currPage - 1) * productsPerPage
  const endIndex = currPage * productsPerPage
  const productsToRender = productsList.slice(startIndex, endIndex)
  console.log('Sliced products: ', productsToRender)
  displayProducts(productsToRender)
}

function setUpPagination(productsList) {
  if (!products || products.length === 0) {
    return
  }
  const numberOfPages = Math.ceil(productsList?.length / productsPerPage)
  console.log(numberOfPages, productsList)
  const paginationBtns = document.getElementById('paginationBtns')
  if (searchQuery.value !== '') {
    console.log('true')
    paginationBtns.classList.add('hidden')
    return
  }
  paginationBtns.classList.remove('hidden')
  paginationBtns.innerHTML = ''

  for (let i = 1; i <= numberOfPages; i++) {
    let newBtn = document.createElement('button')
    newBtn.textContent = i
    newBtn.classList.add(
      'text-blue-500',
      'text-lg',
      'font-semibold',
      'px-3',
      'py-1',
      'm-1',
      'hover:bg-blue-500',
      'hover:text-white'
    )
    if (i === currentPage) {
      newBtn.classList.add('bg-blue-500', 'text-white')
    }
    newBtn.addEventListener('click', () => {
      currentPage = i
      paginate(currentPage, productsList)
      setUpPagination(productsList)
    })
    paginationBtns.appendChild(newBtn)
  }
}

// ******************Product display *******************

function displayProducts(productsOnDisplay) {
  const template = document.querySelector('#product-card')
  const productList = document.querySelector('#product-list')

  productList.innerHTML = ''

  if (productsOnDisplay.length === 0) {
    const noProductMessage = document.createElement('div')
    noProductMessage.textContent = 'No available products right now!!'
    noProductMessage.classList.add(
      'text-center',
      'text-semi-bold',
      'text-lg',
      'text-gray-500',
      'mt-4'
    ) // Add some styling as needed
    productList.appendChild(noProductMessage)
    return // Exit the function early
  }
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

  const filteredProducts = filteredCategoryProducts?.filter((product) => {
    return product?.title.toLowerCase().includes(query.toLowerCase())
  })
  console.log(filteredProducts)
  currentPage = 1
  setUpPagination(filteredProducts)
  paginate(currentPage, filteredProducts)
  // displayProducts(filteredProducts);
}

searchQuery.addEventListener('input', () => {
  filterProducts(searchQuery.value)
})

const menuToggle = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden')
})

//Categories section
let categoryList = []

async function fetchCategoryList() {
  try {
    const res = await fetch(categoryURL)
    categoryList = await res.json()
    displayCategories()
  } catch (error) {
    console.log('Could not fetch categories...', error)
  }
}
fetchCategoryList()

const categoryFilters = document.querySelector('#category-filters')

function displayCategories() {
  categoryList?.forEach((category) => {
    const newOption = document.createElement('option')
    newOption.value = category.name
    newOption.textContent = category.name
    newOption.classList.add('capitalize', 'cursor-pointer')
    categoryFilters.appendChild(newOption)
  })
}

function filteredCategoryList(category) {
  console.log('function called')
  if (
    !products ||
    products.length === 0 ||
    !categoryList ||
    categoryList.length === 0
  ) {
    console.log('Products not available right now')
    return
  }
  if (category === 'All') {
    filteredCategoryProducts = products
    paginate(currentPage, products)
    return
  }
  filteredCategoryProducts = products.filter((product) => {
    return product?.tags?.includes(category)
  })
  console.log(filteredCategoryProducts)
  displayProducts(filteredCategoryProducts)
}

categoryFilters.addEventListener('change', () => {
  filteredCategoryList(categoryFilters.value)
  currentPage = 1
  paginate(currentPage, filteredCategoryProducts)
  setUpPagination(filteredCategoryProducts)
})
