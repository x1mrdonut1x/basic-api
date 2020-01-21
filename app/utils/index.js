const fs = require('fs');

const readFile = (filePath) => (callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    callback(JSON.parse(data));
  });
}

const writeFile = (filePath) => (fileData, callback) => {
  fs.writeFile(filePath,
    JSON.stringify(fileData, null, 2), 'utf8', (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
}

const readObject = (data) => (callback) => {
  callback(data)
}

const writeObject = (data, callback) => {
  callback()
}

module.exports = {
  readFile,
  writeFile,
  readObject,
  writeObject
};