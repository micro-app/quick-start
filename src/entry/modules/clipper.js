let clipper = {};

let $scale = 1;
let $deltaX = 0;
let $deltaY = 0;
let $rotation = 0;

clipper.init = function ({ canvas, context }) {
    this.canvas = canvas;
    this.context = context;
    this.size = this.canvas.width;
    context.translate(this.size / 2, this.size / 2);
};
clipper.reset = function ( img ) {
    this.img = img;
    $scale = this.scale = 1;
    $rotation = this.rotation = 0;
    this.deltaX = this.deltaY = 0;
    $deltaX = $deltaY = 0;
    if (img.width > img.height) {
        $scale = this.size / img.height;
    } else {
        $scale = this.size / img.width;
    }
    this.render();
};
clipper.save = function ( type ) {
    if (type == 'scale') {
        $scale *= this.scale;
        this.scale = 1;
    }
    if (type == 'rotation') {
        $rotation += this.rotation;
        this.rotation = 0;
    }
    if (type == 'translate') {
        $deltaX += this.deltaX;
        $deltaY += this.deltaY;
        this.deltaX = this.deltaY = 0;
    }
};
clipper.render = function () {
    let img = this.img;
    let center = this.size / 2;
    let context = this.context;
    let scale = $scale * this.scale;
    let translateX = this.deltaX + $deltaX;
    let translateY = this.deltaY + $deltaY;
    let rotation = ($rotation + this.rotation) * Math.PI / 180;
    context.clearRect(-center, -center, this.size, this.size);
    context.translate(translateX, translateY);
    context.scale(scale, scale);
    context.rotate(rotation);
    context.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
    context.rotate(-rotation);
    context.scale(1 / scale, 1 / scale);
    context.translate(-translateX, -translateY);
};

export default clipper;
