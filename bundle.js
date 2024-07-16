 const fs = require('fs');
 const parser = require('@babel/parser');
const { get } = require('http')

 const getModuleInfo = (file) => {
   const code = fs.readFileSync(file, 'utf8');
    const ast = parser.parse(code, {
      sourceType: 'module'
    });
    console.log(ast)
 }

// const code = fs.readFileSync('./multiple.cjs', 'utf8');

const res = getModuleInfo('./multiple.js')

console.log(res)
