const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
const backupPath = path.join(__dirname, 'index.html.bak');

// Create a backup
fs.copyFileSync(filePath, backupPath);

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of the placeholder
const newContent = content.replace(
  /onerror="this\.src='https:\/\/via\.placeholder\.com\/200x40\?text=ThoughtWorks'"/g,
  'onerror="this.src=\'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'40\'%3E%3Crect width=\'100%\' height=\'100%\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial,sans-serif\' font-size=\'14\' fill=\'%23666\'%3EThoughtWorks%3C/text%3E%3C/svg%3E\'"'
);

// Write the updated content back to the file
fs.writeFileSync(filePath, newContent, 'utf8');

console.log('Logos have been updated. A backup was created as index.html.bak');
