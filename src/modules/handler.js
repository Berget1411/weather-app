import dom from './dom';
import '../styles/main.scss';

const handler = (() => {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search-input');
  const useMetricButton = document.querySelector('#metric');
  const useImperialButton = document.querySelector('#imperial');
  const clearSearchButton = document.querySelector('#clear-button');
  let unit = 'metric';
  let location = 'Sweden';

  async function load() {
    dom.loading('loading');
    await dom.displayWeather(location, unit);
    dom.loading('finished');
  }

  function clickHandler() {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      location = searchInput.value;
      load();
    });

    useMetricButton.addEventListener('click', switchUnit);
    useImperialButton.addEventListener('click', switchUnit);
  }

  function switchUnit(e) {
    unit = e.target.id;

    document.querySelectorAll('.units button').forEach((button) => {
      button.classList.remove('active-unit');
    });
    e.target.classList.toggle('active-unit');
    load();
  }

  clearSearchButton.addEventListener('click', clearSearch);

  function clearSearch() {
    searchInput.value = '';
  }

  return { load, clickHandler };
})();

export default handler;
