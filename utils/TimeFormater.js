export const TimeFormater = (time) => {
  return '0' + Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
};
