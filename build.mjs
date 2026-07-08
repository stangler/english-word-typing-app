import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

function convertWords(data, defaultLesson = '') {
  return data.filter(row => row['英語'] && row['英語'].trim() !== '').map(row => {
    let lesson = defaultLesson ? defaultLesson : (row['Lesson'] || '');
    const part = String(row['Part'] || row['カテゴリー'] || '');
    
// Split Lesson 1 into 4 parts:
// - Part 1 → Lesson 1-1
// - Part 2 → Lesson 1-2
// - Part 3 → Lesson 1-3
// - Goal Activity → Lesson 1-4
if (lesson === 1 || lesson === '1') {
  if (part === '1') {
    lesson = '1-1';
  } else if (part === '2') {
    lesson = '1-2';
  } else if (part === '3') {
    lesson = '1-3';
  } else if (part === 'Goal Activity') {
    lesson = '1-4';
  }
}
    
    return {
      lesson: lesson,
      part: part,
      en: row['英語'] || '',
      answer: (row['英語'] || '').replace(/〜.*$/, ''),  // Remove 〜 and anything after for answer
      ipa: row['発音'] || '',
      pos: row['品詞'] || '',
      ja: row['意味'] || row['日本語'] || '',
      ex_en: row['英語例文'] || '',
      ex_ja: row['日本語訳'] || '',
      memo: row['なんでもメモ'] || '',
    };
  });
}

// --- Process all xlsx files in xlsx/ directory ---
let allWords = [];

if (!fs.existsSync('xlsx')) {
  console.error('Error: xlsx/ directory not found.');
  process.exit(1);
}

const xlsxFiles = fs.readdirSync('xlsx').filter(f => f.endsWith('.xlsx'));

if (xlsxFiles.length === 0) {
  console.error('Error: No xlsx files found in xlsx/ directory.');
  process.exit(1);
}

xlsxFiles.forEach(filename => {
  const filepath = path.join('xlsx', filename);
  const wb = xlsx.readFile(filepath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(ws);

  let words;
  if (filename.startsWith('小学校') || filename.startsWith('elementary')) {
    words = convertWords(data, 'elementary');
  } else {
    words = convertWords(data);
  }

  allWords = [...allWords, ...words];
  console.log(`  ✓ ${filename}: ${words.length} words`);
});

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
  let filename;
  if (key === 'elementary') {
    filename = 'lesson-elementary.json';
} else if (key.startsWith('1-')) {
    // Handle split lessons like 1-1, 1-2, 1-3, 1-4
    filename = `lesson${key}.json`;
  } else {
    filename = `lesson${key}.json`;
  }
  fs.writeFileSync(`json/${filename}`, JSON.stringify(wordsList, null, 2));
  console.log(`Generated json/${filename} with ${wordsList.length} words`);
}
