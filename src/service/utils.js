"use strict";

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  const shuffledArr = [...someArray];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [shuffledArr[i], shuffledArr[randomPosition]] = [
      shuffledArr[randomPosition],
      shuffledArr[i],
    ];
  }

  return shuffledArr;
};
