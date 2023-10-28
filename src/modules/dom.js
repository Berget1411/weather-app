import api from './api';

const dom = (() => {
  const main = document.querySelector('main');

  function loading(state) {
    const loadingSpinner = document.querySelector('#loading');
    console.log(state);

    if (state === 'loading') {
      loadingSpinner.classList.remove('hide');
      main.classList.add('hide');
    } else {
      loadingSpinner.classList.add('hide');
      main.classList.remove('hide');
    }
  }

  async function displayWeather(location, unit) {
    clearMain();
    try {
      const currentWeather = await api.getCurrentWeather(location, unit);
      const weatherForecast = await api.getWeatherForecast(location, unit);
      renderWeather(currentWeather, weatherForecast);
    } catch (error) {
      displayError();
    }
  }

  function renderWeather(current, forecast) {
    main.append(getCurrentWeather(current), getWeatherForecast(forecast));
  }

  function getCurrentWeather(res) {
    const currentWeather = document.createElement('div');
    currentWeather.classList.add('current-weather-section');
    currentWeather.append(currentHeading(res), currentBody(res));
    return currentWeather;
  }

  function currentHeading(res) {
    const weatherHeading = document.createElement('div');
    weatherHeading.classList.add('weather-heading');
    const location = document.createElement('h2');
    location.classList.add('location');

    const time = document.createElement('p');
    time.classList.add('time');

    if (res['locationName'] === res['country']) {
      location.textContent = res['locationName'];
    } else {
      location.textContent = `${res['locationName']}, ${res['country']}`;
    }

    time.textContent = res['time'];
    weatherHeading.append(location, time);
    return weatherHeading;
  }

  function currentBody(res) {
    const weatherBody = document.createElement('section');
    weatherBody.classList.add('weather-body');

    const weatherMain = document.createElement('div');
    weatherMain.classList.add('weather-main');

    const top = document.createElement('div');
    top.classList.add('weather-main-top');
    const conditionIcon = document.createElement('img');
    conditionIcon.src = res['conditionIcon'];
    const temp = document.createElement('p');
    temp.textContent = res['temp'];
    top.append(conditionIcon, temp);

    const bottom = document.createElement('div');
    bottom.classList.add('weather-main-bottom');
    const conditionText = document.createElement('p');
    conditionText.classList.add('condition-text');
    conditionText.textContent = res['conditionText'];
    const feelsLike = document.createElement('p');
    feelsLike.classList.add('feels-like');
    feelsLike.textContent = res['feelsLike'];
    bottom.append(conditionText, feelsLike);

    weatherMain.append(top, bottom);

    const weatherDetails = document.createElement('div');
    weatherDetails.classList.add('weather-details');

    // const wind = document.createElement('div');
    // wind.classList.add('currentWind');
    // const windTitle = document.createElement('h4');
    // windTitle.textContent = 'Wind';
    // const windInfo = document.createElement('p');
    // windInfo.textContent = res['wind'];
    // wind.append(windTitle, windInfo);

    const dataObj = {
      wind: 'Wind',
      humidity: 'Humidity',
      UV: 'UV index',
      visibility: 'Visibility',
      cloudiness: 'Cloudiness',
      chanceOfRain: 'Chance of rain',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      moonPhase: 'Moon phase',
    };

    for (const data in dataObj) {
      const div = document.createElement('div');
      div.classList.add(`${data}-info`);
      const h4 = document.createElement('h4');
      h4.textContent = dataObj[data];
      const anotherDiv = document.createElement('div');

      if (data === 'wind') {
        const windContainer = document.createElement('div');
        const windDir = document.createElement('span');
        windDir.classList.add('wind-degree');
        windDir.innerHTML =
          '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.001 10.978h-3.251c-.412 0-.75-.335-.75-.752 0-.188.071-.375.206-.518 1.685-1.775 4.692-4.945 6.069-6.396.189-.2.452-.312.725-.312.274 0 .536.112.725.312 1.377 1.451 4.385 4.621 6.068 6.396.136.143.207.33.207.518 0 .417-.337.752-.75.752h-3.251v9.02c0 .531-.47 1.002-1 1.002h-3.998c-.53 0-1-.471-1-1.002z" fill-rule="nonzero"/></svg>';
        windDir.style.transform = `rotate(${res['windDegree']}deg)`;
        windContainer.append(windDir);
        anotherDiv.append(windContainer);
      }
      const p = document.createElement('p');
      p.textContent = res[data];
      anotherDiv.append(p);

      div.append(h4, anotherDiv);
      weatherDetails.append(div);
    }

    weatherBody.append(weatherMain, weatherDetails);
    return weatherBody;
  }

  function getWeatherForecast(res) {
    const container = document.createElement('div');
    container.classList.add('forecast-container');
    const title = document.createElement('h2');
    title.classList.add('forecast-title');
    title.textContent = 'Weekly Forecast';

    const days = document.createElement('div');

    res.forEach((day) => {
      const dayContainer = document.createElement('div');
      dayContainer.classList.add('day-container');
      const date = document.createElement('span');
      date.textContent = day['date'];

      const main = document.createElement('div');
      main.classList.add('day-main');
      const icon = document.createElement('img');
      icon.src = day['conditionIcon'];
      const maxTemp = document.createElement('span');
      maxTemp.textContent = day['maxTemp'];
      main.append(icon, maxTemp);

      const minTemp = document.createElement('span');
      minTemp.classList.add('min-temp');
      minTemp.textContent = day['minTemp'];

      const wind = document.createElement('div');
      wind.classList.add('max-wind');
      const windText = document.createElement('p');
      windText.textContent = day['maxWind'];
      const windDir = document.createElement('span');
      windDir.classList.add('wind-degree');
      windDir.innerHTML =
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.001 10.978h-3.251c-.412 0-.75-.335-.75-.752 0-.188.071-.375.206-.518 1.685-1.775 4.692-4.945 6.069-6.396.189-.2.452-.312.725-.312.274 0 .536.112.725.312 1.377 1.451 4.385 4.621 6.068 6.396.136.143.207.33.207.518 0 .417-.337.752-.75.752h-3.251v9.02c0 .531-.47 1.002-1 1.002h-3.998c-.53 0-1-.471-1-1.002z" fill-rule="nonzero"/></svg>';
      windDir.style.transform = `rotate(${day['windDegree']}deg)`;
      wind.append(windDir, windText);
      dayContainer.append(date, main, minTemp, wind);
      days.append(dayContainer);
    });

    container.append(title, days);
    return container;
  }

  function displayError() {
    clearMain();
    const error = document.createElement('p');
    error.classList.add('error-message');
    if (!document.querySelector('#search-input').value) {
      error.textContent = 'Nothing to geocode';
    } else {
      error.textContent = 'Location not found';
    }

    main.append(error);
  }

  function clearMain() {
    main.textContent = '';
  }

  return { displayWeather, loading };
})();

export default dom;
