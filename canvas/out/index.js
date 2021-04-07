"use strict";
function get_ctx(id) {
    let canvas = document.getElementById(id);
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    let ctx = canvas.getContext("2d");
    return ctx;
}
///////////////////
// simple shapes //
///////////////////
{
    let ctx = get_ctx("canvas_00");
    // filled rectangle
    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);
    // outlined rectangle
    ctx.strokeStyle = "red";
    ctx.strokeRect(250, 50, 100, 100);
    // filled circle
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(500, 100, 50, 0, Math.PI * 2);
    ctx.fill();
    // outlined circle
    ctx.beginPath();
    ctx.arc(700, 100, 50, 0, Math.PI * 2);
    ctx.strokeStyle = "purple";
    ctx.stroke();
    // filled quarter circle
    ctx.beginPath();
    ctx.arc(100, 250, 50, 0, Math.PI / 2);
    // end point has to be center
    ctx.lineTo(100, 250);
    ctx.fillStyle = "pink";
    ctx.fill();
}
//////////
// path //
//////////
{
    let ctx = get_ctx("canvas_01");
    // draw outlined path
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.moveTo(100, 200);
    ctx.lineTo(50, 100);
    ctx.strokeStyle = "green";
    ctx.stroke();
    // draw filled path
    ctx.beginPath();
    ctx.moveTo(400, 100);
    ctx.lineTo(500, 100);
    // all points have to be connected
    ctx.lineTo(400, 200);
    ctx.lineTo(350, 100);
    // last and first point don't have to be connected
    ctx.fillStyle = "green";
    ctx.fill();
    // circle
    ctx.beginPath();
    ctx.arc(650, 150, 50, 0, Math.PI / 2);
    ctx.fillStyle = "green";
    ctx.fill();
}
////////////
// images //
////////////
{
    let ctx = get_ctx("canvas_02");
    function draw_rotated_image(ctx, image, x, y, width, height, rotation) {
        let half_width = width / 2;
        let half_height = height / 2;
        ctx.save();
        ctx.translate(x + half_width, y + half_height);
        ctx.rotate(rotation);
        ctx.drawImage(image, -half_width, -half_height, width, height);
        ctx.restore();
    }
    function draw_image(ctx, image) {
        // has image not yet loaded?
        if (!image.complete) {
            setTimeout(function () {
                draw_image(ctx, image);
            }, 50);
            return;
        }
        ctx.drawImage(image, 20, 20, 300, 300);
        draw_rotated_image(ctx, image, 420, 20, 300, 300, Math.PI / 4);
        draw_rotated_image(ctx, image, 20, 220, 300, 300, 0);
        draw_rotated_image(ctx, image, 420, 220, 300, 300, -Math.PI / 4);
        draw_rotated_image(ctx, image, 20, 420, 300, 300, Math.PI);
        draw_rotated_image(ctx, image, 420, 420, 300, 300, Math.PI / 2);
    }
    let image = new Image();
    image.src = "./images/blue_cat.jpg";
    draw_image(ctx, image);
}
///////////////////////////////
// image cropping and tiling //
///////////////////////////////
{
    let ctx = get_ctx("canvas_03");
    let image_00 = new Image();
    image_00.src = "./images/cat.svg";
    image_00.onload = function () {
        // (image, src_x, src_y, src_width, src_height, x, y, width, height)
        ctx.drawImage(image_00, 0, 0, image_00.naturalWidth / 2, image_00.naturalHeight / 2, 10, 10, 200, 200);
    };
    let image_01 = new Image();
    image_01.onload = function () {
        // create temporary canvas
        let temp_canvas = document.createElement("canvas");
        temp_canvas.width = 50;
        temp_canvas.height = 50;
        let temp_ctx = temp_canvas.getContext("2d");
        // draw image on temp_canvas
        temp_ctx.drawImage(image_01, 0, 0, temp_canvas.width, temp_canvas.height);
        // repeat, repeat-x, repeat-y, no-repeat
        let pattern = ctx.createPattern(
        // can be image or canvas
        temp_canvas, "repeat");
        // rectangle
        ctx.fillStyle = pattern;
        ctx.fillRect(10, 310, 300, 300);
        // circle
        ctx.beginPath();
        ctx.arc(500, 410, 100, 0, Math.PI * 2);
        ctx.fill();
    };
    image_01.src = "./images/blue_cat.jpg";
}
///////////////
// animation //
///////////////
{
    let ctx = get_ctx("canvas_04");
    let rectangle = { x: 0, y: 0, width: 100, height: 100 };
    let rectangles = [
        { x: 0, y: 0, width: 100, height: 100, color: "red", speed_x: 0.5 },
        { x: 0, y: 100, width: 100, height: 100, color: "blue", speed_x: 1 },
        { x: 0, y: 200, width: 100, height: 100, color: "green", speed_x: 2 },
        { x: 0, y: 300, width: 100, height: 100, color: "orange", speed_x: 3 },
        { x: 0, y: 400, width: 100, height: 100, color: "yellow", speed_x: 4 },
        { x: 0, y: 500, width: 100, height: 100, color: "pink", speed_x: 5 },
        { x: 0, y: 600, width: 100, height: 100, color: "purple", speed_x: 6 },
    ];
    function update() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        rectangles.forEach(function (rectangle) {
            ctx.fillStyle = rectangle.color;
            ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            rectangle.x += rectangle.speed_x;
        });
        // call ASAP using double buffer
        window.requestAnimationFrame(update);
    }
    update();
}
//////////////////////
// better animation //
//////////////////////
{
    let ctx = get_ctx("canvas_05");
    class Animation {
        constructor() {
            this.bound_update = this.update.bind(this);
            this.last_frame_time = 0;
            this.rectangles = [
                {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    color: "red",
                    speed_x: 10,
                },
                {
                    x: 0,
                    y: 100,
                    width: 100,
                    height: 100,
                    color: "blue",
                    speed_x: 20,
                },
                {
                    x: 0,
                    y: 200,
                    width: 100,
                    height: 100,
                    color: "green",
                    speed_x: 30,
                },
                {
                    x: 0,
                    y: 300,
                    width: 100,
                    height: 100,
                    color: "orange",
                    speed_x: 40,
                },
                {
                    x: 0,
                    y: 400,
                    width: 100,
                    height: 100,
                    color: "yellow",
                    speed_x: 50,
                },
                {
                    x: 0,
                    y: 500,
                    width: 100,
                    height: 100,
                    color: "pink",
                    speed_x: 60,
                },
                {
                    x: 0,
                    y: 600,
                    width: 100,
                    height: 100,
                    color: "purple",
                    speed_x: 70,
                },
            ];
        }
        init_animation() {
            this.last_frame_time = Date.now();
            this.update();
        }
        update() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            let current_frame_time = Date.now();
            let frame_time_delta = current_frame_time - this.last_frame_time;
            this.last_frame_time = current_frame_time;
            this.rectangles.forEach(function (rectangle) {
                // draw
                ctx.fillStyle = rectangle.color;
                ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
                // update
                rectangle.x += (rectangle.speed_x * frame_time_delta) / 1000;
            });
            window.requestAnimationFrame(this.bound_update);
        }
    }
    let animation = new Animation();
    animation.init_animation();
}
///////////////////
// hit detection //
///////////////////
{
    let ctx = get_ctx("canvas_06");
    class Object {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    class Circle extends Object {
        constructor(x, y, radius) {
            super(x, y);
            this.radius = radius;
        }
        is_hit_by(x, y) {
            let distance = Math.sqrt(Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2));
            return distance <= this.radius;
        }
    }
    class Rectangle extends Object {
        constructor(x, y, width, height) {
            super(x, y);
            this.width = width;
            this.height = height;
        }
        is_hit_by(x, y) {
            return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
        }
    }
    let circle = new Circle(150, 150, 100);
    let rectangle = new Rectangle(250, 50, 100, 200);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}
