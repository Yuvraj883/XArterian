const url = 'https://dummyjson.com/products/category-list';
let categoryList=[];

async function fetchCategoryList(){

  try{
  const res = await fetch(url);
  categoryList = await res.json();
   displayCategories();


  } catch(error){
    console.log("Could not fetch categories...", error);
  }
}
fetchCategoryList();
console.log(categoryList);


function displayCategories(){
  // const template = document.querySelector('#category-template');
  const categoryFilters = document.querySelector('#category-filters');

  categoryList?.forEach((category)=>{
    // const tempNode = template.content.cloneNode(true);
    const newOption = document.createElement('option');
    newOption.value = category;
    newOption.textContent = category;
    newOption.classList.add('capitalize','cursor-pointer');
    categoryFilters.appendChild(newOption);
    console.log(category);
  })
}

