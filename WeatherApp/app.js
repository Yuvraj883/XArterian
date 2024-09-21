const searchIcon = document.getElementById('search-icon')
let inputField = document.getElementById('city-input')

const getWeatherInfo = () => {
  const API_KEY = 'b99b652d448e47e5a48a226c5ed84910'
  let city = inputField.value
  if (city === '') {
    city = 'delhi'
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        console.log(`API Call Failed with status ${res.status}`)
      } else {
        return res.json()
      }
    })
    .then((data) => {
      document.querySelector('.output').classList.add('visible')
      document.querySelector('.city-name').textContent = `${data?.name}📍`
      document.querySelector('.temperature').textContent = `Temp☀️: ${(
        data?.main?.temp / 10
      ).toFixed(1)}°C`
      document.querySelector(
        '.humidity'
      ).textContent = `Humidity☁️: ${data?.main?.humidity}%`
      document.querySelector(
        '.icon'
      ).src = `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`
      document.querySelector(
        '.description'
      ).textContent = `${data?.weather[0]?.description}`
      document.querySelector('.heading').textContent = ''

      
    })
    .catch((error) => {
      console.log(error)
    })
}

searchIcon.addEventListener('click', getWeatherInfo)
inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getWeatherInfo()
  }
})
