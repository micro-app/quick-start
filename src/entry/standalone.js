if (navigator.standalone) {
    document.addEventListener('touchmove', ( event ) => {
        event.preventDefault();
    }, false);
    try {
        location.href = decodeURIComponent((location.hash.split('?')[1]).match(/(?:^|&)link=(.*?)($|&)/)[1]);
    } catch (e) {
        location.href = 'http://example.com';
    }
}
