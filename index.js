const xlsx = require('xlsx');
const fs = require('fs');

const file = fs.readFileSync('./QSS String.xlsx');
const workbook = xlsx.read(file, { type: 'buffer' });
const language = {};

const { Sheets: sheet, SheetNames: sheetNames } = workbook;
const json = xlsx.utils.sheet_to_json(sheet[sheetNames[0]]);

json.forEach((string) => {
  const key = string.KEY;
  if (key) {
    Object.keys(string).forEach((langName) => {
      if (langName !== 'KEY') {
        if (!language[langName]) language[langName] = {};

        const [key1, key2] = key.split('.');
        if (key2) {
          if (!language[langName][key1]) language[langName][key1] = {};
          language[langName][key1][key2] = string[langName].toString();
        } else {
          language[langName][key1] = string[langName].toString();
        }
      }
    });
  }
});

Object.keys(language).forEach((langName) => {
  fs.writeFileSync(
    `./dist/${langName}.json`,
    JSON.stringify(language[langName], null, '\t'),
    { encoding: 'utf8' }
  );
});
