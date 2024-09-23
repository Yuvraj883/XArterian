document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;


  console.log('Form submitted:', { name, email, message });
  alert('Thank you for your message!');
});


function initMap() {
  const location = { lat: 40.7128, lng: -74.0060 }; // Example coordinates (New York City)
  const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: location,
  });
  const marker = new google.maps.Marker({
      position: location,
      map: map,
  });
}

// Load Google Maps
const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
script.async = true;
document.head.appendChild(script);

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
mobileMenu.classList.toggle('hidden');
console.log('clicked');

})
