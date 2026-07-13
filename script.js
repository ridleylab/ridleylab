const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const dirs = ['d:/ridleylab/app/admin', 'd:/ridleylab/components/admin'];
let files = [];
dirs.forEach(d => files = files.concat(walkSync(d)));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Input new (bg-white/50) -> bg-gradient-to-r from-blue-50/50 to-indigo-50/50
  content = content.replace(/bg-white\/50 border border-white\/60/g, 'bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60');
  
  // Tag boxes or others with bg-gray-50
  content = content.replace(/bg-gray-50 p-4 border rounded-xl/g, 'bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-4 border border-white/60 rounded-xl');
  content = content.replace(/bg-gray-50/g, 'bg-white/50'); 

  // Placeholders
  content = content.replace(/placeholder-gray-500/g, 'placeholder-gray-400');

  // Borders
  content = content.replace(/border-gray-150/g, 'border-white/60');
  content = content.replace(/border-gray-200/g, 'border-white/60');
  content = content.replace(/border-gray-300/g, 'border-white/60');
  
  // Tables
  content = content.replace(/divide-gray-150/g, 'divide-white/60');
  content = content.replace(/divide-gray-200/g, 'divide-white/60');
  content = content.replace(/hover:bg-gray-50\/50/g, 'hover:bg-white/60');
  content = content.replace(/bg-gray-50 text-xs font-bold uppercase/g, 'bg-white/40 backdrop-blur-md text-xs font-bold uppercase');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated: ' + file);
  }
});
