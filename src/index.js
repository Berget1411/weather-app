import handler from './modules/handler';
import defaultWeather from './modules/default';

window.onload = () => {
  handler();
  defaultWeather();
};
