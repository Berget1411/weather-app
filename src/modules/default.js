import api from './api';
import dom from './dom';

const defaultWeather = () => {
  api
    .getCurrentWeather('Stockholm', 'metric')
    .then((res) => {
      dom.displayCurrentWeather(res);
    })
    .catch((rej) => {
      dom.displayError(rej);
    });

  api
    .getWeatherForecast('Stockholm', 'metric')
    .then((res) => {
      dom.displayWeatherForecast(res);
    })
    .catch((rej) => {
      dom.displayError(rej);
    });
};

export default defaultWeather;
