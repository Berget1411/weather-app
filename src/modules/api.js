import { format, parseISO } from 'date-fns';

const api = (() => {
  const API_KEY = '7160bd18f24a414b9b175538232510';
  const DEFAULT_LOCATION = 'sweden';
  const DAYS = '8';

  async function getWeatherData(location = DEFAULT_LOCATION) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=${DAYS}`,
      { mode: 'cors' },
    );

    const data = await response.json();

    return data;
  }

  async function getCurrentWeather(location, unit) {
    const data = await getWeatherData(location);
    console.log(data);

    const usedData = {
      locationName: data['location']['name'],
      country: data['location']['country'],
      time: formatCurrentDate(data['location']['localtime']),

      conditionText: data['current']['condition']['text'],
      conditionIcon: data['current']['condition']['icon'],

      humidity: `${data['current']['humidity']}%`,
      UV: data['current']['uv'],
      visibility: `${data['current']['vis_km']}km`,
      cloudiness: `${data['current']['cloud']}%`,
      chanceOfRain: `${data['forecast']['forecastday'][0]['day']['daily_chance_of_rain']}%`,
      sunrise: data['forecast']['forecastday'][0]['astro']['sunrise'],
      sunset: data['forecast']['forecastday'][0]['astro']['sunset'],
      moonPhase: data['forecast']['forecastday'][0]['astro']['moon_phase'],
    };

    if (unit === 'metric') {
      usedData['temp'] = `${data['current']['temp_c']}°C`;
      usedData['feelsLike'] = `Feels like ${data['current']['feelslike_c']}°C`;
      usedData['wind'] = `${data['current']['wind_kph']} kph`;
    } else {
      usedData['temp'] = `${data['current']['temp_f']}°F`;
      usedData['feelsLike'] = `Feels like ${data['current']['feelslike_f']}°F`;
      usedData['wind'] = `${data['current']['wind_mph']}mph`;
    }

    return usedData;
  }

  async function getWeatherForecast(location, unit) {
    const data = await getWeatherData(location);

    const forecastData = [];

    for (let i = 1; i < parseInt(DAYS); i++) {
      let day = {
        date: formatForecastDate(data['forecast']['forecastday'][i]['date']),
        conditionIcon:
          data['forecast']['forecastday'][i]['day']['condition']['icon'],
      };

      if (unit === 'metric') {
        day['maxTemp'] = data['forecast']['forecastday'][i]['day']['maxtemp_c'];
        day['minTemp'] = data['forecast']['forecastday'][i]['day']['mintemp_c'];
        day['maxWind'] =
          data['forecast']['forecastday'][i]['day']['maxwind_kph'];
      } else {
        day['maxTemp'] = data['forecast']['forecastday'][i]['day']['maxtemp_f'];
        day['minTemp'] = data['forecast']['forecastday'][i]['day']['mintemp_f'];
        day['maxWind'] =
          data['forecast']['forecastday'][i]['day']['maxwind_mph'];
      }

      forecastData.push(day);
    }
    return forecastData;
  }

  function formatCurrentDate(date) {
    return `${format(
      parseISO(date.substring(10, -1)),
      'EEEE dd MMMM yyyy',
    )} | ${date.substring(10, 16)}`;
  }

  function formatForecastDate(date) {
    return format(parseISO(date), 'EEEE');
  }

  return { getCurrentWeather, getWeatherForecast };
})();

export default api;
