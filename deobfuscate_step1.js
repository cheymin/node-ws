
const fs = require('fs');
const code = fs.readFileSync('/workspace/index.js', 'utf8');

// Extract the string array function
const arrFuncStart = code.indexOf('function _0x4093()');
const arrFuncEnd = code.indexOf('return _0x5e6d26;', arrFuncStart);
const arrFunc = code.substring(arrFuncStart, arrFuncEnd + 'return _0x5e6d26;'.length) + '}';

// Extract the decoder function
const decFuncStart = code.indexOf('function _0x2025(');
let depth2 = 0;
let decFuncEnd = -1;
let started = false;
for (let i = decFuncStart; i < code.length; i++) {
  if (code[i] === '{') { depth2++; started = true; }
  if (code[i] === '}') {
    depth2--;
    if (started && depth2 === 0) { decFuncEnd = i + 1; break; }
  }
}
const decFunc = code.substring(decFuncStart, decFuncEnd);

// Extract the IIFE (shuffler)
const iifeStart = code.indexOf('(function(_0x362574,_0x2d58a5)');
let depth = 0;
let iifeEnd = -1;
for (let i = iifeStart; i < code.length; i++) {
  if (code[i] === '(') depth++;
  if (code[i] === ')') {
    depth--;
    if (depth === 0) { iifeEnd = i + 1; break; }
  }
}
const iife = code.substring(iifeStart, iifeEnd);

// Build setup
eval(arrFunc);
eval(decFunc);
eval(iife);

// Now decode all strings
const stringMap = {};
for (let i = 0; i < 500; i++) {
  try {
    const val = _0x2025(i);
    stringMap[i] = val;
  } catch(e) {
    break;
  }
}

console.log('Decoded', Object.keys(stringMap).length, 'strings');
console.log(JSON.stringify(stringMap, null, 2));
