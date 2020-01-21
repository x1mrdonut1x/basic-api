const fs = require('fs');
const readFile = (filePath, callback, ) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    callback(JSON.parse(data));
  });
}

const writeFile = (filePath, fileData, callback, ) => {

  fs.writeFile(filePath, fileData, 'utf8', (err) => {
    if (err) {
      throw err;
    }

    callback();
  });
}

module.exports = {
  readFile,
  writeFile
};