const logInBtnMobile = document.querySelector('#log-in-btn-mobile');
const logOutBtnMobile = document.querySelector('#log-out-btn-mobile');
const logInBtn = document.querySelector('#log-in-btn');
const logOutBtn = document.querySelector('#log-out-btn');

// if(logInBtn && logOutBtn){
const token = JSON.parse(localStorage.getItem('token'));

if(token){
  logInBtn.classList.add('hidden');
  logInBtnMobile.classList.add('hidden');
  logOutBtn.classList.remove('hidden');
}
else{
  logOutBtnMobile.classList.add('hidden');
  logOutBtn.classList.add('hidden');

}

logOutBtn.addEventListener('click', ()=>{
  localStorage.removeItem('token');
  window.location.reload();
});

logOutBtnMobile.addEventListener('click', ()=>{
  localStorage.removeItem('token');
  window.location.reload();
});



// verifyAuth();
