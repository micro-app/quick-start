import microStorage from 'micro-storage';

if (navigator.standalone) {
    document.addEventListener('touchmove', ( event ) => {
        event.preventDefault();
    }, false);
    const namespace = `micro-app`;
    let store = microStorage(namespace);
    let cache = applicationCache;
    if (cache.status == cache.UNCACHED) {
        // Save the first cached.
        store('last-update', +new Date);
    }
    cache.addEventListener('updateready', () => {
        if (cache.status == cache.UPDATEREADY) {
            // Cover the value in each update.
            store('last-update', +new Date);
            location.reload();
        }
    }, false);
    function redirect ( event ) {
        let link = process.env.EXAMPLE_LINK;
        let referrer = {};
        referrer.app = {};
        referrer.timing = {};
        referrer.type = event.type;
        referrer.version = process.env.VERSION;
        referrer.timeStamp = +new Date;
        referrer.lastUpdate = store('last-update');
        if (performance.timing.toJSON) {
            referrer.timing = performance.timing.toJSON();
        } else {
            for (let key in performance.timing) {
                referrer.timing[key] = performance.timing[key];
            }
        }
        (location.hash.split('?')[1]||'').split('&').forEach(( param ) => {
            let temp = param.split('=');
            let key = temp[0];
            let value = decodeURIComponent(decodeURIComponent(temp[1] || ''));
            referrer.app[key] = value;
            if (key == 'link') {
                link = value;
            }
        });
        window.name = `${ namespace }=${ encodeURIComponent(JSON.stringify(referrer)) }`;
        location.replace(link);
    }
    // 'cached'
    // 'checking',
    // 'downloading',
    // 'error'
    // 'noupdate'
    // 'obsolete'
    // 'progress',
    // 'updateready'
    ['cached', 'error', 'noupdate', 'obsolete'].forEach(( type ) => {
        cache.addEventListener(type, redirect, false);
    });
}
