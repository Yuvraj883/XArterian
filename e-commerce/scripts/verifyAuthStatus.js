const logInBtn = document.querySelector('.log-in-btn');
const logOutBtn = document.querySelector('.log-out-btn');

if(logInBtn && logOutBtn){
const token = JSON.parse(localStorage.getItem('token'));

if(token){
  logInBtn.classList.add('hidden');
  logOutBtn.classList.remove('hidden');
}
else{
  logOutBtn.classList.add('hidden');
  logInBtn.classList.remove('hidden');

}

logOutBtn.addEventListener('click', ()=>{
  localStorage.removeItem('token');
  window.location.reload();
});
}
