
let cart = localStorage.getItem('cart');
if(cart){
 cart = JSON.parse(cart);
}
else{
  cart = [];
}
console.log(cart);

const cartItems = document.querySelector('#cart-items')
const template = document.querySelector('#cart-item');


cart.forEach(item => {
  const cartNode = template.content.cloneNode(true);
  cartNode.querySelector('#cart-img').src=item?.thumbnail;
  cartNode.querySelector('#cart-img').alt=item?.title;
  cartNode.querySelector('#cart-title').textContent = item?.title;
  cartNode.querySelector('#cart-quantity').textContent = `Quantity: ${item?.quantity}`;



  cartItems.append(cartNode);


});


const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
mobileMenu.classList.toggle('hidden');
console.log('clicked');
})
