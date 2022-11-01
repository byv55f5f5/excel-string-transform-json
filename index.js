const xlsx = require('xlsx');
const fs = require('fs');

const file = fs.readFileSync('./QSS String.xlsx');
const workbook = xlsx.read(file, { type: 'buffer' });
const language = {};

const { Sheets: sheet, SheetNames: sheetNames } = workbook;
const json = xlsx.utils.sheet_to_json(sheet[sheetNames[0]]);

function createNestedObj(languageMap, keys, string) {
  function recursive(refer, ka) {
    let copy = [...ka];
    if (copy.length > 1) {
      if (!refer[copy[0]]) {
        refer[copy[0]] = {};
      }
      const newRefer = refer[copy[0]];
      copy = copy.slice(1);
      return recursive(newRefer, copy);
    } else {
      refer[copy[0]] = string.toString();
    }
  }

  recursive(languageMap, keys);
}

json.forEach((stringGroup) => {
  const key = stringGroup.KEY;
  delete stringGroup.KEY;
  Object.entries(stringGroup).forEach((entry) => {
    const [langName, string] = entry;
    if (!language[langName]) language[langName] = {};
    const keys = key.split('.');
    if (keys.length > 1) {
      createNestedObj(language[langName], keys, string);
    } else {
      language[langName][keys[0]] = string.toString();
    }
  });
});

Object.keys(language).forEach((langName) => {
  fs.writeFileSync(
    `./dist/${langName}.json`,
    JSON.stringify(language[langName], null, '\t'),
    { encoding: 'utf8' }
  );
});
