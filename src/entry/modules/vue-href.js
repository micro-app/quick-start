export default function ( Vue ) {
    Vue.directive('href', {
        bind () {
            function onclick () {
                if (onclick.href) {
                    location.href = onclick.href;
                }
            };
            onclick.href = null;
            this.el.addEventListener('click', onclick, false);
            this.update = this.update.bind(this, onclick);
            this.unbind = this.unbind.bind(this, onclick);
        },
        update ( onclick, value ) {
            onclick.href = value;
        },
        unbind ( onclick ) {
            this.el.removeEventListener('click', onclick, false);
        },
    });
};
