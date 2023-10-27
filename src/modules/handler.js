import api from './api';
import dom from './dom';
import '../styles/main.scss';

const handler = () => {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search-input');
  const useMetricButton = document.querySelector('#metric');
  const useImperialButton = document.querySelector('#imperial');
  let unit = 'metric';
  let location = 'Sweden';

  searchForm.addEventListener('submit', submitForm);

  function submitForm(e) {
    e.preventDefault();
    location = searchInput.value;
    displayWeather(location, unit);
  }

  function displayWeather(location, unit) {
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
  }

  useMetricButton.addEventListener('click', changeUnit);
  useImperialButton.addEventListener('click', changeUnit);

  function changeUnit(e) {
    unit = e.target.id;

    document.querySelectorAll('.units button').forEach((button) => {
      button.classList.remove('active-unit');
    });
    e.target.classList.toggle('active-unit');
    displayWeather(location, unit);
  }
};

export default handler;
