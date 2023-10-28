import handler from './modules/handler';
import dom from './modules/dom';

window.onload = () => {
  handler();
  dom.displayWeather('Sweden', 'metric'); //default search
};
