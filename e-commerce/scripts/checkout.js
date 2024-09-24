const cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart);
const cartSummary = document.getElementById('cart-summary');
const template = document.getElementById('product-container');
const total = document.getElementById('total');
let totalSum = 0;

if(cart.length>0){

  cart.forEach(element => {
    const cartNode = template.content.cloneNode(true);
    const productCost = element?.price * element?.quantity;
    cartNode.querySelector('#product-title').textContent = element?.title;
    cartNode.querySelector('#product-price').textContent = `$${productCost}`;
    totalSum += productCost;
    cartSummary.append(cartNode);

  });

total.textContent = `$${totalSum}`


}
