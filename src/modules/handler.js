import api from './api';
import dom from './dom';
import '../styles/main.scss';

const handler = () => {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search-input');
  const unit = 'imperial';

  searchForm.addEventListener('submit', searchWeather);

  function searchWeather(e) {
    e.preventDefault();
    const location = searchInput.value;

    api
      .getCurrentWeather(location, unit)
      .then((res) => {
        dom.displayCurrentWeather(res);
      })
      .catch((rej) => {
        dom.displayError(rej);
        console.log(rej);
      });

    api
      .getWeatherForecast(location, unit)
      .then((res) => {
        dom.displayWeatherForecast(res);
      })
      .catch((rej) => {
        dom.displayError(rej);
        console.log(rej);
      });
  }
};

export default handler;
