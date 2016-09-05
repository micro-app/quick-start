module.exports = function ( Vue ) {
    Vue.directive('href', {
        bind : function () {
        },
        update : function ( href ) {
            this.el.addEventListener('click', function () {
                location.href = href;
            }, false);
        },
    });
};
