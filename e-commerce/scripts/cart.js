
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

// const removeBtn = document.querySelector('.remove-btn');
// removeBtn.addEventListener('click', ()=>{
//   const index = this.parentElement.dataSet.id;
//   alert(index);
// })


cart.forEach(item => {
  const cartNode = template.content.cloneNode(true);
  cartNode.querySelector('#cart-img').src=item?.thumbnail;
  cartNode.querySelector('#cart-img').alt=item?.title;
  cartNode.querySelector('#cart-title').textContent = item?.title;
  cartNode.querySelector('#cart-quantity').textContent = `Quantity: ${item?.quantity}`;
  cartNode.querySelector('.remove-btn').setAttribute('date-id', item.id);

  const removeBtn = cartNode.querySelector('.remove-btn');
  removeBtn.addEventListener('click', ()=>{
  const index = cart.findIndex(prod=>prod.id===item.id);
  cart = cart?.splice(index, 1);
  console.log(cart);
  })

  cartItems.append(cartNode);


});


const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
mobileMenu.classList.toggle('hidden');
console.log('clicked');
})
