const searchBtn = document.getElementById('searchBtn');
const countryInput = document.getElementById('countryInput');
const errorMsg = document.getElementById('errorMsg');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', fetchWeather);

countryInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    fetchWeather();
  }
});

async function fetchWeather() {
  const query = countryInput.value.trim();


  errorMsg.classList.add('hidden');
  
  if (!query) {
    showError('Please enter a country name.');
    return;
  }

  searchBtn.innerText = 'Loading...';

  try {
    
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      showError('Country/Location not found. Please try again.');
      return;
    }

    const location = geoData.results[0];
    const lat = location.latitude;
    const lon = location.longitude;
    const countryName = location.name;

  
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const weatherData = await weatherResponse.json();

    const temp = weatherData.current_weather.temperature;

  
    document.getElementById('resCountry').innerText = countryName;
    document.getElementById('resLat').innerText = lat.toFixed(4);
    document.getElementById('resLon').innerText = lon.toFixed(4);
    document.getElementById('resTemp').innerText = `${temp}°C`;

    resultsDiv.classList.remove('hidden');
  } catch (err) {
    showError('Failed to fetch data. Please check your network.');
  } finally {
    searchBtn.innerText = 'Get Weather';
  }
}

function showError(msg) {
  errorMsg.innerText = msg;
  errorMsg.classList.remove('hidden');
  resultsDiv.classList.add('hidden');
  searchBtn.innerText = 'Get Weather';
}