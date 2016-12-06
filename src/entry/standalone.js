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
        let anchor = document.createElement('a');
        let link = process.env.EXAMPLE_LINK;
        let data = {};
        data.hash = '';
        data.query = {};
        data.timing = {};
        data.type = event.type;
        data.version = '@VERSION';
        data.timeStamp = +new Date;
        data.lastUpdate = store('last-update');
        for (let key in performance.timing) {
            data.timing[key] = performance.timing[key];
        }
        (location.hash.split('?')[1]||'').split('&').forEach(( param ) => {
            let temp = param.split('=');
            let key = temp[0];
            let value = decodeURIComponent(decodeURIComponent(temp[1] || ''));
            if (key == 'link') {
                link = value;
            } else {
                data.query[key] = value;
            }
        });
        anchor.href = link;
        if (anchor.hash && anchor.hash.length > 1) {
            data.hash = anchor.hash.slice(1);
        }
        anchor.hash = `${ namespace }=${ encodeURIComponent(JSON.stringify(data)) }`;
        // console.log(data);
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
