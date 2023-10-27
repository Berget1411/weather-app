const dom = (() => {
  const main = document.querySelector('main');

  function displayCurrentWeather(res) {
    main.innerHTML = '';
    const currentWeather = document.createElement('div');
    currentWeather.classList.add('current-weather-section');
    currentWeather.append(weatherHeading(res), weatherBody(res));
    main.append(currentWeather);
  }

  function weatherHeading(res) {
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

  function weatherBody(res) {
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

    const arr = {
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

    for (const data in arr) {
      const div = document.createElement('div');
      div.classList.add(`${data}-info`);
      const h4 = document.createElement('h4');
      h4.textContent = arr[data];
      const span = document.createElement('span');
      span.textContent = res[data];

      div.append(h4, span);
      weatherDetails.append(div);
    }

    weatherBody.append(weatherMain, weatherDetails);
    return weatherBody;
  }

  function displayWeatherForecast(res) {
    main.append(weatherForecast(res));
  }

  function weatherForecast(res) {
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

      const wind = document.createElement('span');
      wind.textContent = day['maxWind'];
      dayContainer.append(date, main, minTemp, wind);
      days.append(dayContainer);
    });

    container.append(title, days);
    return container;
  }

  function displayError(rej) {
    main.innerHTML = '';
    const error = document.createElement('p');
    error.classList.add('error-message');
    error.textContent = 'Location does not exist';
    main.append(error);
  }

  return { displayCurrentWeather, displayWeatherForecast, displayError };
})();

export default dom;
