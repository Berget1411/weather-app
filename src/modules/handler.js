import displayWeather from './displayWeather';
import '../styles/main.scss';

const handler = () => {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search-input');
  const useMetricButton = document.querySelector('#metric');
  const useImperialButton = document.querySelector('#imperial');
  const clearSearchButton = document.querySelector('#clear-button');
  let unit = 'metric';
  let location = 'Sweden';

  searchForm.addEventListener('submit', submitForm);

  function submitForm(e) {
    e.preventDefault();
    location = searchInput.value;
    displayWeather(location, unit);
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

  clearSearchButton.addEventListener('click', clearSearch);

  function clearSearch() {
    searchInput.value = '';
  }
};

export default handler;
