const fs = require('fs');





const code = fs.readFileSync('./multiple.cjs', 'utf8');

const module = { exports: {} };
