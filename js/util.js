const getStringAttribute = (nameAttribute, value) =>  `${nameAttribute}(${value})`;

const getNameEffectClass =  (value) => `effects__preview--${value}`;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getStringAttribute };
export { getNameEffectClass };
export { debounce };
