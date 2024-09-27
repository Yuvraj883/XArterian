const url = 'https://xarterian.onrender.com';

const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginTab.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  loginTab.classList.add('text-blue-600', 'border-blue-600');
  signupTab.classList.remove('text-blue-600', 'border-blue-600');
});

signupTab.addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  signupTab.classList.add('text-blue-600', 'border-blue-600');
  loginTab.classList.remove('text-blue-600', 'border-blue-600');
});

// Simple login function
async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (email && password) {
    const resp = await fetch(`${url}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set Content-Type header for JSON
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!resp.ok) {
      console.log(`HTTP error occurred: ${resp.statusText}`); // Use statusText to log error
      return;
    }


    const data = await resp.json();
    const token = data.token;
    localStorage.setItem('token', JSON.stringify(data?.token));
    
  } else {
    alert('Please enter both email and password.');
  }
}


async function signup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  if (name && email && password) {
    const resp = await fetch(`${url}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    if (!resp.ok) {
      console.log(`HTTP error occurred: ${resp.statusText}`); // Use statusText to log error
      return;
    }

    const data = await resp.json();
    console.log(data); // Handle the registration response
    localStorage.setItem('token', JSON.stringify(data?.token));
  } else {
    alert('Please fill all the fields.');
  }
}
