import handler from './modules/handler';
import displayWeather from './modules/displayWeather';

window.onload = () => {
  handler();
  displayWeather('Sweden', 'metric'); //default search
};
