const cart = JSON.parse(localStorage.getItem('cart'));
const baseURL = window.location.origin;
console.log(cart);
const cartSummary = document.getElementById('cart-summary');
const template = document.getElementById('product-container');
const total = document.getElementById('total');
let totalSum = 0;

const token = JSON.parse(localStorage.getItem('token'));
console.log(token);

if(token!=null){



if(cart.length>0){

  cart.forEach(element => {
    const cartNode = template.content.cloneNode(true);
    const productCost = element?.price * element?.quantity;
    cartNode.querySelector('#product-title').textContent = element?.title;
    cartNode.querySelector('#product-price').textContent = `$${productCost}`;
    totalSum += productCost;
    cartSummary.append(cartNode);

  });
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', ()=>{
    alert(cart);
    localStorage.setItem('cart', JSON.stringify([]));
  })

total.textContent = `$${totalSum}`
}

}
else{
  window.location.href=`${baseURL}/pages/authenticate.html`;
}
