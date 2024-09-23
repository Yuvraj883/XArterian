
let cart = localStorage.getItem('cart');

const cartItems = document.querySelector('#cart-items');
const template = document.querySelector('#cart-item');

if(cart){
 cart = JSON.parse(cart);
}
else{
  cart = [];
}
console.log(cart);

if(cart.length===0){
  const cartNode = template.content.cloneNode(true);
  cartNode.querySelector('#cart-title').textContent = "You don't have anything in the cart!";
  const removeBtn = cartNode.querySelector('.remove-btn');
  const imgContainer = cartNode.querySelector('#img-container');
  imgContainer.classList.add('hidden');
  removeBtn.classList.add('hidden');


  cartItems.append(cartNode);


}
else{
  cart.forEach(item => {
    const cartNode = template.content.cloneNode(true);
    cartNode.querySelector('#cart-img').src=item?.thumbnail;
    cartNode.querySelector('#cart-img').alt=item?.title;
    cartNode.querySelector('#cart-title').textContent = item?.title;
    cartNode.querySelector('#cart-quantity').textContent = `Quantity: ${item?.quantity}`;
    cartNode.querySelector('.remove-btn').setAttribute('data-id', item.id);
    cartNode.querySelector('#cart-img-anchor').href=`./product.html?id=${item?.id}`;

    const removeBtn = cartNode.querySelector('.remove-btn');
    removeBtn.addEventListener('click', ()=>{
        cart = cart.filter(prod=>prod.id!==item.id);
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();

    })

    cartItems.append(cartNode);


  });
}



const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
mobileMenu.classList.toggle('hidden');
console.log('clicked');
})
