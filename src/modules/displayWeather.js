import api from './api';
import dom from './dom';

const displayWeather = (location, unit) => {
  api
    .getCurrentWeather(location, unit)
    .then((res) => {
      dom.displayCurrentWeather(res);
    })
    .catch((rej) => {
      dom.displayError(rej);
    });

  api
    .getWeatherForecast(location, unit)
    .then((res) => {
      dom.displayWeatherForecast(res);
    })
    .catch((rej) => {
      dom.displayError(rej);
    });
};

export default displayWeather;
