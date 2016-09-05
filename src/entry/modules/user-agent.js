let userAgent = navigator.userAgent;

exports.ios = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(userAgent);
exports.mobile = /Android|webOS|iPhone|Windows Phone|iPod|iPad|BlackBerry|SymbianOS/i.test(userAgent);
exports.safari = /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//i.test(userAgent);
exports.standalone = navigator.standalone;
