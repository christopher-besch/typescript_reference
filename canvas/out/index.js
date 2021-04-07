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
let ctx_00 = get_ctx("canvas_00");
// filled rectangle
ctx_00.fillStyle = "green";
ctx_00.fillRect(50, 50, 100, 100);
// outlined rectangle
ctx_00.strokeStyle = "red";
ctx_00.strokeRect(250, 50, 100, 100);
// filled circle
ctx_00.fillStyle = "blue";
ctx_00.beginPath();
ctx_00.arc(500, 100, 50, 0, Math.PI * 2);
ctx_00.fill();
// outlined circle
ctx_00.beginPath();
ctx_00.arc(700, 100, 50, 0, Math.PI * 2);
ctx_00.strokeStyle = "purple";
ctx_00.stroke();
// filled quarter circle
ctx_00.beginPath();
ctx_00.arc(100, 250, 50, 0, Math.PI / 2);
// end point has to be center
ctx_00.lineTo(100, 250);
ctx_00.fillStyle = "pink";
ctx_00.fill();
//////////
// path //
//////////
let ctx_01 = get_ctx("canvas_01");
// draw outlined path
ctx_01.beginPath();
ctx_01.moveTo(100, 100);
ctx_01.lineTo(200, 100);
ctx_01.moveTo(100, 200);
ctx_01.lineTo(50, 100);
ctx_01.strokeStyle = "green";
ctx_01.stroke();
// draw filled path
ctx_01.beginPath();
ctx_01.moveTo(400, 100);
ctx_01.lineTo(500, 100);
// all points have to be connected
ctx_01.lineTo(400, 200);
ctx_01.lineTo(350, 100);
// last and first point don't have to be connected
ctx_01.fillStyle = "green";
ctx_01.fill();
// circle
ctx_01.beginPath();
ctx_01.arc(650, 150, 50, 0, Math.PI / 2);
ctx_01.fillStyle = "green";
ctx_01.fill();
////////////
// images //
////////////
let ctx_02 = get_ctx("canvas_02");
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
let image_00 = new Image();
image_00.src = "./images/blue_cat.jpg";
draw_image(ctx_02, image_00);
///////////////////////////////
// image cropping and tiling //
///////////////////////////////
let ctx_03 = get_ctx("canvas_03");
let image_01 = new Image();
image_01.src = "./images/cat.svg";
image_01.onload = function () {
    // (image, src_x, src_y, src_width, src_height, x, y, width, height)
    ctx_03.drawImage(image_01, 0, 0, image_01.naturalWidth / 2, image_01.naturalHeight / 2, 10, 10, 200, 200);
};
let image_02 = new Image();
image_02.onload = function () {
    // create temporary canvas
    let temp_canvas = document.createElement("canvas");
    temp_canvas.width = 50;
    temp_canvas.height = 50;
    let temp_ctx = temp_canvas.getContext("2d");
    // draw image on temp_canvas
    temp_ctx.drawImage(image_02, 0, 0, temp_canvas.width, temp_canvas.height);
    // repeat, repeat-x, repeat-y, no-repeat
    let pattern = ctx_03.createPattern(
    // can be image or canvas
    temp_canvas, "repeat");
    // rectangle
    ctx_03.fillStyle = pattern;
    ctx_03.fillRect(10, 310, 300, 300);
    // circle
    ctx_03.beginPath();
    ctx_03.arc(500, 410, 100, 0, Math.PI * 2);
    ctx_03.fill();
};
image_02.src = "./images/blue_cat.jpg";
