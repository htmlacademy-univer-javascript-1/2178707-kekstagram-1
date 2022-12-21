import { ALERT_MESSAGE_SHOW_TIME } from './Settings/settings--events-time.js';

const getStringAttribute = (nameAttribute, value) =>  `${nameAttribute}(${value})`;

const getNameEffectClass =  (value) => `effects__preview--${value}`;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_MESSAGE_SHOW_TIME);
};


export { getStringAttribute };
export { getNameEffectClass };
export { debounce };
export { showAlert };
