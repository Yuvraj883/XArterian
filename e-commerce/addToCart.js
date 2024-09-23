export const addToCart = (productId, productTitle, productThumbnail, productPrice)=>{

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item=>item.id===productId);

  if(existingProduct){
    existingProduct.quantity += 1;
    console.log("Quantity update");
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
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  alert(`${productTitle} added to the cart!`);


}

