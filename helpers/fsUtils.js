// SECTION: IMPORT MODULES
const fs = require('fs');
const util = require('util');

// SECTION: READ FILE
const readFromFile = util.promisify(fs.readFile);

// SECTION: WRITE TO FILE
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// SECTION: READ AND APPEND
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// SECTION: EXPORT MODULE
module.exports = { readFromFile, writeToFile, readAndAppend };