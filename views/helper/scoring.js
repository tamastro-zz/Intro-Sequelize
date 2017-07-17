module.exports = function (num) {
  if (num > 100) {
    return 'A+'
  }
  else if (num < 100 && num > 85) {
    return 'A'
  }
  else if (num < 85 && num > 70) {
    return 'B'
  }
  else if (num < 70 && num > 55) {
    return 'C'
  }
  else if (num < 55) {
    return 'E'
  }
  else {
    return null
  }
};
