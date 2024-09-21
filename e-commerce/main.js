
const URL = 'https://dummyjson.com/products';

// const products = await fetch(URL);

let products;

fetch(URL).then((res)=>{
  // console.log(res);
  return res.json();
})
.then((data)=>{
  products = data; 
  console.log(data)})
.catch((e)=>{
  console.log(e);
})

// fetch('https://dummyjson.com/products')
// .then(res => res.json())
// .then(console.log);
