const className = 'is-active';

export default function ( Vue ) {
    Vue.directive('action', {
        bind () {
            function activation () {
                this.classList.add(className);
            };
            function deactivation () {
                this.classList.remove(className);
            };
            this.el.addEventListener('touchstart', activation, false);
            this.el.addEventListener('touchend', deactivation, false);
            this.el.addEventListener('touchcancel', deactivation, false);
            this.unbind = this.unbind.bind(this, { activation, deactivation });
        },
        unbind ({ activation, deactivation }) {
            this.el.removeEventListener('touchstart', activation, false);
            this.el.removeEventListener('touchend', deactivation, false);
            this.el.removeEventListener('touchcancel', deactivation, false);
        },
    });
};
