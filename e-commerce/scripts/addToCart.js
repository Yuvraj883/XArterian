const baseURL = window.location.origin;

export const addToCart = (productId, productTitle, productThumbnail, productPrice)=>{

  const token = JSON.parse(localStorage.getItem('token'));

  if(token){



  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item=>item.id===productId);

  if(existingProduct){
    existingProduct.quantity += 1;
    // console.log("Quantity update");
  }
  else{
    const item = {
      id: productId,
      title: productTitle,
      thumbnail:productThumbnail,
      price:productPrice,
      quantity:1


    }
    cart.push(item);
  }
  alert(`${productTitle} added to the cart!`);
  localStorage.setItem('cart', JSON.stringify(cart));



}
else{
  alert(baseURL);
  window.location.href=`${baseURL}/pages/authenticate.html`;
}
}
