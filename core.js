const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');


const getModuleInfo = (file) => {
    const code = fs.readFileSync(file, 'utf8');
    const ast = parser.parse(code, {
        sourceType: 'module'
    });
    const dependencies = {};
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(file);
            const newFile = './' + path.join(dirname, node.source.value);
            dependencies[node.source.value] = newFile;
        }
    });
    const { code: es5Code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    });
    return {
        file,
        dependencies,
        code: es5Code
    };
}

console.info('getModuleInfo', getModuleInfo('./start.js'))
getModuleInfo('./start.js')

const parseModules = (file) => {
    const entry = getModuleInfo(file);
    const modules = [entry];
    for (const module of modules) {
        const { dependencies } = module;
        if (dependencies) {
            for (const key in dependencies) {
                if (dependencies.hasOwnProperty(key)) {
                    modules.push(getModuleInfo(dependencies[key]));
                }
            }
        }
    }
    return modules;
}

console.info('parseModules', parseModules('./start.js'))
