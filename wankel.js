const ANGLE_120 = Math.PI * 2 / 3;
const ANGLE_150 = Math.PI * 5 / 6;
const ANGLE_180 = Math.PI;
const ANGLE_210 = Math.PI * 7 / 6;
const ANGLE_360 = Math.PI * 2;

// ロータリーが1回転する間に何コマ描くか
// 数字を減らすほどより飛ばして描くので回転が速くなります
const RATE = 1000; // (1/1000度ごとに描く)

// 描画用のキャンバス
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// ロータリーのサイズ
let rotarySize;
// 偏向する円の半径
let deflection;
// 重心からローターの頂点までの距離
let distanceOfGravity;

let canvasDiv = document.getElementById('canvas_div');
// スクリーン幅
let width;
// スクリーン高さ
let height;
// スクリーン画面左右中央
let centerX;
// スクリーン画面高さ中央
let centerY;

// スクリーンサイズ変更時に座標を求め直す
function resetScreenSize() {
    width = canvas.width = canvasDiv.offsetWidth;
    height = canvas.height = canvasDiv.offsetHeight;
    // 高さと幅の内狭い方をもとに全体のサイズを決める
    let narrow = Math.min(width, height);
    centerX = width / 2;
    centerY = height / 2;
    rotarySize = narrow / 2;
    deflection = (2 / Math.sqrt(3) - 1) * rotarySize / 2;
    distanceOfGravity = rotarySize / Math.sqrt(3);
}
resetScreenSize();

window.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('resize', resetScreenSize);
});

function drawAnimation(timestamp) {
    context.clearRect(0, 0, width, height);
    drawHousing();
    drawRotary(timestamp);
}

// ハウジングを描画する
function drawHousing() {
    context.beginPath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    for (rotaryAngle = 0; rotaryAngle < ANGLE_360; rotaryAngle += 0.001) {
        let shaftAngle = (rotaryAngle + ANGLE_180) * 3;
        let x = (Math.cos(shaftAngle) * deflection) + (Math.cos(rotaryAngle) * distanceOfGravity) + centerX;
        let y = (Math.sin(shaftAngle) * deflection) + (Math.sin(rotaryAngle) * distanceOfGravity) + centerY;
        context.lineTo(x, y);
    }
    context.moveTo(centerX + deflection, centerY);
    context.arc(centerX, centerY, deflection, 0, ANGLE_360);
    context.closePath();
    context.stroke();
}

function drawRotary(timestamp) {
    let rotaryAngle = timestamp / RATE % ANGLE_360;
    let shaftAngle = rotaryAngle * 3;
    let x = Math.cos(shaftAngle) * deflection + centerX;
    let y = Math.sin(shaftAngle) * deflection + centerY;
    let angle1 = rotaryAngle + ANGLE_180;
    let angle2 = angle1 + ANGLE_120;
    let angle3 = angle2 + ANGLE_120;

    context.beginPath();
    context.fillStyle = 'rgb(255, 0, 0)';
    context.arc(x, y, 2, 0, ANGLE_360);
    context.fill();

    context.beginPath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.arc(x, y, deflection * 2, 0, ANGLE_360);
    context.stroke();

    drawSide(x, y, angle1, 'rgb(255,0,0)');
    drawSide(x, y, angle2, 'rgb(0,128,0');
    drawSide(x, y, angle3, 'rgb(0,128,255)');
    window.requestAnimationFrame(drawAnimation);


}

function drawSide(baseX, baseY, angle, color) {
    context.fillStyle = color;
    let x = baseX + Math.cos(angle) * distanceOfGravity;
    let y = baseY + Math.sin(angle) * distanceOfGravity;
    context.beginPath();
    context.arc(x, y, 4, 0, ANGLE_360);
    context.fill();
    context.beginPath();
    context.strokeStyle = color;
    context.arc(x, y, rotarySize, angle + ANGLE_150, angle + ANGLE_210);

    context.stroke();
}

window.requestAnimationFrame(drawAnimation);