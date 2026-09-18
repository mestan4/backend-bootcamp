const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/notes.json');

const readNotesFromFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
    return [];
  }
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
};

const writeNotesToFile = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = {
  readNotesFromFile,
  writeNotesToFile
};