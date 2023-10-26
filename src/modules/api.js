import { format, parseISO } from 'date-fns';

const api = (() => {
  const API_KEY = '7160bd18f24a414b9b175538232510';
  const DEFAULT_LOCATION = 'sweden';
  const DAYS = '7';

  async function getWeatherData(location = DEFAULT_LOCATION) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=${DAYS}`,
      { mode: 'cors' },
    );

    const data = await response.json();

    return data;
  }

  async function getCurrentWeather(location) {
    const data = await getWeatherData(location);

    return {
      locationName: data['location']['name'],
      country: data['location']['country'],
      time: formatCurrentDate(data['location']['localtime']),

      tempC: data['current']['temp_c'],
      tempF: data['current']['temp_f'],
      feelsLikeC: data['current']['feelslike_c'],
      feelsLikeF: data['current']['feelslike_f'],
      conditionText: data['current']['condition']['text'],
      conditionIcon: data['current']['condition']['icon'],

      windMph: data['current']['wind_mph'],
      windKph: data['current']['wind_kph'],
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

  async function getWeatherForecast(location) {
    const data = await getWeatherData(location);

    const forecastData = [];

    for (let i = 1; i < parseInt(DAYS); i++) {
      let day = {
        date: formatForecastDate(data['forecast']['forecastday'][i]['date']),
        maxTempC: data['forecast']['forecastday'][i]['day']['maxtemp_c'],
        maxTempF: data['forecast']['forecastday'][i]['day']['maxtemp_f'],
        minTempC: data['forecast']['forecastday'][i]['day']['mintemp_f'],
        minTempF: data['forecast']['forecastday'][i]['day']['mintemp_f'],
        maxWindMph: data['forecast']['forecastday'][i]['day']['maxwind_mph'],
        maxWindKph: data['forecast']['forecastday'][i]['day']['maxwind_kph'],
        conditionIcon:
          data['forecast']['forecastday'][i]['day']['condition']['icon'],
      };

      forecastData.push(day);
    }
    return forecastData;
  }

  function formatCurrentDate(date) {
    return format(parseISO(date), 'EEEE dd MMMM yyyy | hh:mm');
  }

  function formatForecastDate(date) {
    return format(parseISO(date), 'EEEE');
  }

  return { getCurrentWeather, getWeatherForecast };
})();

export default api;
