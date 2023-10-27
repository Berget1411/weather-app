const dom = (() => {
  const main = document.querySelector('main');

  function displayCurrentWeather(res) {
    main.innerHTML = '';
    main.append(weatherHeading(res), weatherBody(res));
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
    const weatherInfo = document.createElement('section');
    weatherInfo.classList.add('weather-info');

    const weatherMain = document.createElement('div');
    weatherMain.classList.add('weather-main');
    const conditionIcon = document.createElement('img');
    conditionIcon.src = res['conditionIcon'];
    const temp = document.createElement('p');
    temp.textContent = res['temp'];
    weatherMain.append(conditionIcon, temp);

    const weatherSecond = document.createElement('div');
    weatherSecond.classList.add('weather-second');
    const conditionText = document.createElement('p');
    conditionText.textContent = res['conditionText'];
    const feelsLike = document.createElement('p');
    feelsLike.textContent = res['feelsLike'];
    weatherSecond.append(conditionText, feelsLike);

    const weatherThird = document.createElement('div');
    weatherSecond.classList.add('weather-third');

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
      main.append(div);
    }

    weatherInfo.append(weatherMain, weatherSecond, weatherThird);
    return weatherInfo;
  }

  function displayWeatherForecast(res) {
    main.append(weatherForecast(res));
  }

  function weatherForecast(res) {
    const container = document.createElement('div');
    const title = document.querySelector('h2');
    title.classList.add('forecast-title');
    title.textContent = 'Weekly Forecast';

    const days = document.createElement('div');

    res.forEach((day) => {
      const container = document.createElement('div');
      const date = document.createElement('span');
      date.textContent = day['date'];

      const main = document.createElement('div');
      const icon = document.createElement('img');
      icon.src = day['conditionIcon'];
      const maxTemp = document.createElement('span');
      maxTemp.textContent = day['maxTemp'];
      main.append(icon, maxTemp);

      const minTemp = document.createElement('span');
      minTemp.textContent = day['minTemp'];

      const wind = document.createElement('span');
      wind.textContent = day['maxWind'];

      days.append(date, main, minTemp, wind);
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
