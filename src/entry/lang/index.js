import { en } from './en.js';
import { zh } from './zh.js';

const language = navigator.language;

let lang = en;

// if (/^en/i.test(language)) {
//     lang = en;
// }

if (/^zh/i.test(language)) {
    lang = zh;
}

exports.lang = lang;
