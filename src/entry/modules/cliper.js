// TODO: 缩放旋转有个闪屏的bug 需要确认

let cliper = {};

let $scale = 0;
let $deltaX = 0;
let $deltaY = 0;
let $rotation = 0;

cliper.init = function ({ canvas, context }) {
    this.canvas = canvas;
    this.context = context;
    this.size = this.canvas.width;
    context.translate(this.size / 2, this.size / 2);
};
cliper.reset = function ( img ) {
    this.img = img;
    $scale = this.scale = 1;
    $rotation = this.rotation = 0;
    this.deltaX = this.deltaY = 0;
    $deltaX = $deltaY = -this.size / 2;
    if (img.width > img.height) {
        $scale = this.size / img.height;
        $deltaX -= (img.width - img.height) * $scale / 2;
    } else {
        $scale = this.size / img.width;
        $deltaY -= (img.height - img.width) * $scale / 2;
    }
    this.render();
};
cliper.save = function () {
    $scale *= this.scale;
    $deltaX += this.deltaX;
    $deltaY += this.deltaY;
    $rotation += this.rotation;
    this.deltaX = this.deltaY = 0;
    this.scale = 1;
    this.rotation = 0;
};
cliper.render = function () {
    let center = this.size / 2;
    let context = this.context;
    let scale = $scale * this.scale;
    let rotation = ($rotation + this.rotation) * Math.PI / 180;
    let translateX = ($deltaX + this.deltaX) / scale;
    let translateY = ($deltaY + this.deltaY) / scale;
    context.clearRect(-center, -center, this.size, this.size);
    context.rotate(rotation);
    context.scale(scale, scale);
    context.translate(translateX, translateY);
    context.drawImage(this.img, 0, 0, this.img.width, this.img.height);
    context.translate(-translateX, -translateY);
    context.scale(1 / scale, 1 / scale);
    context.rotate(-rotation);
};

exports.cliper = cliper;
