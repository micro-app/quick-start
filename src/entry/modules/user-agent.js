const userAgent = navigator.userAgent;

/**
 * The device is mobile or not
 * @type {Boolean} mobile
 */
export const mobile = /Android|webOS|iPhone|Windows Phone|iPod|iPad|BlackBerry|SymbianOS/i.test(userAgent);

/**
 * The browser is safari or not
 * @type {Boolean} safari
 */
export const safari = /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//i.test(userAgent);

/**
 * Language
 * @type {String} language
 */
export const language = /^zh/i.test(navigator.language) ? 'zh' : 'en';
