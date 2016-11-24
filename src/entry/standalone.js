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
    let anchor = document.createElement('a');
    function redirect ( event ) {
        let data = {};
        data.originHash = '';
        data.type = event.type;
        data.version = '@VERSION';
        data.onRedirect = +new Date;
        data.timing = {};
        data.lastUpdate = store('last-update');
        try {
            anchor.href = decodeURIComponent((location.hash.split('?')[1]).match(/(?:^|&)link=(.*?)($|&)/)[1]);
        } catch (e) {
            anchor.href = 'http://example.com';
        }
        for (let key in performance.timing) {
            data.timing[key] = performance.timing[key];
        }
        if (anchor.hash && anchor.hash.length > 1) {
            data.originHash = anchor.hash.slice(1);
        }
        anchor.hash = `${ namespace }=${ encodeURIComponent(JSON.stringify(data)) }`;
        location.replace(anchor.href);
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
