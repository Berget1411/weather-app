const api = (() => {
  const API_KEY = '7160bd18f24a414b9b175538232510';
  const LOCATION = 'sweden';
  const DAYS = '3';

  async function getWeatherData(location = LOCATION) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=${DAYS}`,
        { mode: 'cors' },
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCurrentWeather(location) {
    const data = await getWeatherData(location);

    return {
      country: data['location']['country'],
      city: data['location']['city'],
      time: data['location']['localtime'],

      tempC: data['current']['temp_c'],
      tempF: data['current']['temp_f'],
      feelsLikeC: data['current']['feelslike_c'],
      feelsLikeF: data['current']['feelslike_f'],
      conditionText: data['current']['condition']['text'],
      conditionIcon: data['current']['condition']['icon'],

      wind: data['current']['wind_mph'],
      humidity: data['current']['humidity'],
      UV: data['current']['UV'],
      visibility: data['current']['vis_km'],
      cloudiness: data['current']['cloud'],
      chanceOfRain:
        data['forecast']['forecastday'][0]['day']['daily_chance_of_rain'],
      sunrise: data['forecast']['forecastday'][0]['astro']['sunrise'],
      sunset: data['forecast']['forecastday'][0]['astro']['sunset'],
      moonPhase: data['forecast']['forecastday'][0]['astro']['moon_phase'],
    };
  }

  async function getWeatherForecast() {
    const data = await getWeatherData(location);

    const forecastData = [];

    for (let i = 1; i < parseInt(DAYS); i++) {
      let day = {
        date: data['forecast']['forecastday'][i]['date'],
        maxTempC: data['forecast']['forecastday'][i]['day']['maxtemp_c'],
        maxTempF: data['forecast']['forecastday'][i]['day']['maxtemp_f'],
        minTempC: data['forecast']['forecastday'][i]['day']['mintemp_f'],
        minTempF: data['forecast']['forecastday'][i]['day']['mintemp_f'],
        maxWind: data['forecast']['forecastday'][i]['day']['maxwind_mph'],
        conditionIcon:
          data['forecast']['forecastday'][i]['day']['condition']['icon'],
      };

      forecastData.push(day);
    }
    return forecastData;
  }

  return { getCurrentWeather, getWeatherForecast };
})();

export default api;
