const language = navigator.language;

let lang = 'en';

if (/^zh/i.test(language)) {
    lang = 'zh';
}

exports.lang = lang;
