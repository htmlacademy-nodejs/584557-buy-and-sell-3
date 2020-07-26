"use strict";

const path = require(`path`);

const {nanoid} = require(`nanoid`);

const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../utils`);

const {MAX_ID_LENGTH} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COMMENTS = 4;

const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = path.join(`data`, `sentences.txt`);
const FILE_TITLES_PATH = path.join(`data`, `titles.txt`);
const FILE_CATEGORIES_PATH = path.join(`data`, `categories.txt`);
const FILE_COMMENTS_PATH = path.join(`data`, `comments.txt`);

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const readContent = async (filePath) => {
  console.log(`readContent`, filePath);
  try {
    const content = await fs.readFile(path.join(__dirname, filePath), `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const generateComments = (count, comments) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments).slice(0, getRandomInt(1, 1)).join(` `),
    }));

const getPictureFileName = (number) =>
  `item${number.toString().padStart(2, 0)}.jpg`;

const generateOffers = (count, titles, categories, sentences, comments) => {
  return Array(count).fill({}).map(() => {
    const goodCategories = shuffle(categories);
    goodCategories.length = getRandomInt(1, goodCategories.length);

    return {
      id: nanoid(MAX_ID_LENGTH),
      category: goodCategories,
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
      description: shuffle(sentences).slice(1, 5).join(` `),
      picture: getPictureFileName(
          getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)
      ),
      title: titles[getRandomInt(0, titles.length - 1)],
      type: Object.keys(OfferType)[
        Math.floor(Math.random() * Object.keys(OfferType).length)
      ],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    };
  });
};

module.exports = {
  name: `--generate`,
  async run(count) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(
        generateOffers(countOffer, titles, categories, sentences, comments)
    );

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(`Operation success. File created.`);
    } catch (err) {
      console.error(`Can't write data to file...`);
    }
  },
};
