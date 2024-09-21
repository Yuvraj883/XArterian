// alert("Jai Shri Ram");
const API_KEY = 'b99b652d448e47e5a48a226c5ed84910'

const url = `https://api.openweathermap.org/data/2.5/weather?q=${'delhi'}&appid=${API_KEY}`

fetch(url).then((res)=>{
  if(!res.ok){
    console.log( `API Call Failed with status ${res.status}`);
  }
  else{
    return res.json();
  }
}).then((data)=>{
  console.log(data?.main);
}).catch(error=>{
  console.log(error);
})
