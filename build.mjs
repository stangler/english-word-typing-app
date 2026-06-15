import xlsx from 'xlsx';
import fs from 'fs';

// --- Process Lesson1-3.xlsx ---
const wb = xlsx.readFile('xlsx/Lesson1-3.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(ws);

function convertWords(data, defaultLesson = '') {
  return data.filter(row => row['英語'] && row['英語'].trim() !== '').map(row => ({
    lesson: defaultLesson ? defaultLesson : (row['Lesson'] || ''),
    part: String(row['Part'] || row['カテゴリー'] || ''),
    en: row['英語'] || '',
    answer: (row['英語'] || '').replace(/〜.*$/, ''),  // Remove 〜 and anything after for answer
    ipa: row['発音'] || '',
    pos: row['品詞'] || '',
    ja: row['意味'] || row['日本語'] || '',
    ex_en: row['英語例文'] || '',
    ex_ja: row['日本語訳'] || '',
    memo: row['なんでもメモ'] || '',
  }));
}

let allWords = convertWords(data);

// --- Process 小学校.xlsx separately ---
if (fs.existsSync('xlsx/小学校.xlsx')) {
  const wbElem = xlsx.readFile('xlsx/小学校.xlsx');
  const wsElem = wbElem.Sheets[wbElem.SheetNames[0]];
  const dataElem = xlsx.utils.sheet_to_json(wsElem);
  
  const elemWords = convertWords(dataElem, 'elementary');
  
  // Merge with elementary words
  allWords = [...allWords, ...elemWords];
}

// Write combined JSON to json/ folder
if (!fs.existsSync('json')) fs.mkdirSync('json');
fs.writeFileSync('json/words.json', JSON.stringify(allWords, null, 2));
console.log(`Generated json/words.json with ${allWords.length} total words`);

// Write words-data.js to json/ folder (for direct file:// opening without server)
const jsContent = `window.WORDS = ${JSON.stringify(allWords, null, 2)};`;
fs.writeFileSync('json/words-data.js', jsContent);
console.log(`Generated json/words-data.js with ${allWords.length} total words`);

// Also write individual lesson JSONs to json/ folder
const lessons = {};
allWords.forEach(w => {
  const key = String(w.lesson);
  if (!lessons[key]) lessons[key] = [];
  lessons[key].push(w);
});

for (const [key, wordsList] of Object.entries(lessons)) {
  const filename = key === 'elementary' ? 'lesson-elementary.json' : `lesson${key}.json`;
  fs.writeFileSync(`json/${filename}`, JSON.stringify(wordsList, null, 2));
  console.log(`Generated json/${filename} with ${wordsList.length} words`);
}
