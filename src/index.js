import "./styles.css";
import { debounce, throttle } from "underscore";

const MAX = 10;
var checkScrollSpeed = (function (settings) {
  settings = settings || {};

  var lastPos,
    newPos,
    timer,
    delta,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();

  return function () {
    newPos = window.scrollY;
    if (lastPos != null) {
      // && newPos < maxScroll
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();

const setSkew = throttle((skew) => {
  $("p").css("transform", "skewY(" + skew + "deg)");
}, 16);
const setBack = debounce(() => {
  $("p").css("transform", "skewY(0deg)");
}, 200);

// listen to "scroll" event
window.onscroll = function () {
  let speed = checkScrollSpeed();
  if (speed > MAX) speed = MAX;

  if (speed < -MAX) speed = -MAX;

  console.log(speed);
  setSkew(speed / 10);
  setBack();
};
