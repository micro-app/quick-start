module.exports = function ( Vue ) {
    Vue.directive('action', {
        bind : function () {
        },
        update : function () {
            if (this.arg == 'active') {
                let className = 'is-active';
                this.el.addEventListener('touchstart', function () {
                    this.classList.add(className);
                }, false);
                this.el.addEventListener('touchend', function () {
                    this.classList.remove(className);
                }, false);
            }
        },
    });
};
