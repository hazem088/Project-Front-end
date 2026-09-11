const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// الـ API Key الخاص بك من موقع WeatherAPI
const API_KEY = '10693b45d86a41aa8c3142300261109'; 

rl.question('Enter the name of a country/city: ', async (countryInput) => {
    const countryName = countryInput.trim();

    if (!countryName) {
        console.log('Error: Country name cannot be empty.');
        rl.close();
        return;
    }

    // رابط WeatherAPI
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(countryName)}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // استخراج البيانات (درجة الحرارة، خط الطول، وخط العرض)
        const temp = data.current.temp_c;
        const lat = data.location.lat;
        const lon = data.location.lon;

        console.log('\n====== Weather Information ======');
        console.log(`Location       : ${data.location.name}, ${data.location.country}`);
        console.log(`Temperature    : ${temp} °C`);
        console.log(`Latitude (lat) : ${lat}`);
        console.log(`Longitude (lon): ${lon}`);
        console.log('=================================\n');

    } catch (error) {
        console.log('\n❌ Error Occurred:');

        if (error.response) {
            const status = error.response.status;

            if (status === 400 || status === 403) {
                console.log('• API Error: Invalid API Key or Country/City not found.');
            } else {
                console.log(`• Server Error: Request failed with status code ${status}.`);
            }
        } else if (error.request) {
            console.log('• Network Error: Unable to reach the server. Please check your internet connection.');
        } else {
            console.log(`• Something went wrong: ${error.message}`);
        }
    } finally {
        rl.close();
    }
});