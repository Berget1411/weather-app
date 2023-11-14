import { format, parseISO } from 'date-fns';

const api = (() => {
  const API_KEY = 'eb95d14a6e3a4ae5b57102057231411';
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
      windDegree: data['current']['wind_degree'] - 180,
      chanceOfRain: `${data['forecast']['forecastday'][0]['day']['daily_chance_of_rain']}%`,

      sunrise: data['forecast']['forecastday'][0]['astro']['sunrise'].substring(
        5,
        -1,
      ),
      sunset: data['forecast']['forecastday'][0]['astro']['sunset'].substring(
        5,
        -1,
      ),
      moonPhase: data['forecast']['forecastday'][0]['astro']['moon_phase'],
    };

    if (unit === 'metric') {
      usedData['temp'] = `${Math.round(data['current']['temp_c'])}°C`;
      usedData['feelsLike'] = `Feels like ${Math.round(
        data['current']['feelslike_c'],
      )}°C`;
      usedData['wind'] = `${Math.round(data['current']['wind_kph'])} kph`;
    } else {
      usedData['temp'] = `${Math.round(data['current']['temp_f'])}°F`;
      usedData['feelsLike'] = `Feels like ${Math.round(
        data['current']['feelslike_f'],
      )}°F`;
      usedData['wind'] = `${Math.round(data['current']['wind_mph'])}mph`;
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
        windDegree:
          data['forecast']['forecastday'][i]['hour'][14]['wind_degree'] - 180,
      };

      if (unit === 'metric') {
        day['maxTemp'] = Math.round(
          data['forecast']['forecastday'][i]['day']['maxtemp_c'],
        );
        day['minTemp'] = Math.round(
          data['forecast']['forecastday'][i]['day']['mintemp_c'],
        );
        day['maxWind'] = Math.round(
          data['forecast']['forecastday'][i]['day']['maxwind_kph'],
        );
      } else {
        day['maxTemp'] = Math.round(
          data['forecast']['forecastday'][i]['day']['maxtemp_f'],
        );
        day['minTemp'] = Math.round(
          data['forecast']['forecastday'][i]['day']['mintemp_f'],
        );
        day['maxWind'] = Math.round(
          data['forecast']['forecastday'][i]['day']['maxwind_mph'],
        );
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
