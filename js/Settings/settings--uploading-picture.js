const scalePopupSettings = {
  min: 25,
  max: 100,
  step: 25,
  start: 55
};

const filterEffectSettings  = {
  chrome: {
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
    connect: 'lower'
  },
  sepia: {
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
    connect: 'lower'
  },
  marvin: {
    range: { min: 0, max: 100 },
    step: 1,
    start: 100,
    connect: 'lower'
  },
  phobos: {
    range: {  min: 0, max: 3 },
    step: 0.1,
    start: 3,
    connect: 'lower'
  },
  heat: {
    range: { min: 0, max: 3 },
    step: 0.1,
    start: 3,
    connect: 'lower'
  }
};

const ALLOWED_UPLOADING_TYPES = ['.gif', '.jpeg', '.jpg', '.png', '.svg'];

export { scalePopupSettings };
export { filterEffectSettings };
export { ALLOWED_UPLOADING_TYPES };
