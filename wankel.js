const ANGLE_120 = Math.PI * 2 / 3;
const ANGLE_150 = Math.PI * 5 / 6;
const ANGLE_180 = Math.PI;
const ANGLE_210 = Math.PI * 7 / 6;
const ANGLE_360 = Math.PI * 2;

// ロータリーが1回転する間に何コマ描くか
// 数字を減らすほどより飛ばして描くので回転が速くなります
const RATE = 1000; // (1/1000度ごとに描く)

// 描画用のキャンバスのContext
let context;
// スクリーン幅
let width;
// スクリーン高さ
let height;
// スクリーン画面左右中央
let centerX;
// スクリーン画面高さ中央
let centerY;
// ロータリーのサイズ
let rotarySize;
// 偏向する円の半径
let lengthDeflection;
// 重心からローターの頂点までの距離
let lengthCornerGravity;
// スクリーンサイズ変更時に座標を求め直す
function resetScreenSize() {
    let canvas = document.getElementById('canvas');
    let canvasDiv = document.getElementById('canvas_div');
    width = canvas.width = canvasDiv.offsetWidth;
    height = canvas.height = canvasDiv.offsetHeight;
    context = canvas.getContext('2d');
    context.lineWidth = 4;
    // 高さと幅の内狭い方をもとに全体のサイズを決める
    centerX = width / 2;
    centerY = height / 2;
    rotarySize = Math.min(width, height) / 2;
    // 前回は直径で求めたがプログラム上では半径のほうが扱いやすいので/2する
    lengthDeflection = (2 / Math.sqrt(3) - 1) * rotarySize / 2;
    lengthCornerGravity = rotarySize / Math.sqrt(3);
}
resetScreenSize();

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', resetScreenSize);
});

window.requestAnimationFrame(drawAnimation);
function drawAnimation(timestamp) {
    context.clearRect(0, 0, width, height);

    drawHousing();
    drawRotary(timestamp);
    window.requestAnimationFrame(drawAnimation);
}

// ハウジングを描画する
function drawHousing() {
    context.beginPath();
    context.strokeStyle = 'rgb(128, 128, 128)';
    context.arc(centerX, centerY, lengthDeflection, 0, ANGLE_360);
    context.stroke();
    context.beginPath();
    for (rotaryAngle = 0; rotaryAngle < ANGLE_360; rotaryAngle += 0.01) {
        let shaftAngle = (rotaryAngle + ANGLE_180) * 3;
        let x = (Math.cos(shaftAngle) * lengthDeflection) + (Math.cos(rotaryAngle) * lengthCornerGravity) + centerX;
        let y = (Math.sin(shaftAngle) * lengthDeflection) + (Math.sin(rotaryAngle) * lengthCornerGravity) + centerY;
        context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
}

// ロータリーを描画する。
function drawRotary(timestamp) {
    let corner1Angle = timestamp / RATE % ANGLE_360;
    let corner2Angle = corner1Angle + ANGLE_120;
    let corner3Angle = corner2Angle + ANGLE_120;
    let shaftAngle = (corner1Angle + ANGLE_180) * 3;
    let baseX = Math.cos(shaftAngle) * lengthDeflection + centerX;
    let baseY = Math.sin(shaftAngle) * lengthDeflection + centerY;

    context.beginPath();
    context.fillStyle = 'rgb(255, 0, 0)';
    context.arc(baseX, baseY, 4, 0, ANGLE_360);
    context.fill();

    context.beginPath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.arc(baseX, baseY, lengthDeflection * 2, 0, ANGLE_360);
    context.stroke();

    drawSide(baseX, baseY, corner1Angle, 'rgb(255,0,0)');
    drawSide(baseX, baseY, corner2Angle, 'rgb(0,128,0');
    drawSide(baseX, baseY, corner3Angle, 'rgb(0,128,255)');

}

function drawSide(baseX, baseY, angle, color) {
    let cornerX = baseX + Math.cos(angle) * lengthCornerGravity;
    let cornerY = baseY + Math.sin(angle) * lengthCornerGravity;
    context.beginPath();
    context.fillStyle = color;
    context.arc(cornerX, cornerY, 4, 0, ANGLE_360);
    context.fill();
    context.beginPath();
    context.strokeStyle = color;
    context.arc(cornerX, cornerY, rotarySize, angle + ANGLE_150, angle + ANGLE_210);
    context.stroke();
}
