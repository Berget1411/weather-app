import handler from './modules/handler';
import dom from './modules/dom';

window.onload = () => {
  handler.load();
  handler.clickHandler();
};
