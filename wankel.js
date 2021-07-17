let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const RATE = 1000;
let rotarySize = 200;
let deflection = (2 / Math.sqrt(3) - 1) * rotarySize;
let distanceOfGravity = rotarySize / Math.sqrt(3);

let canvasDiv = document.getElementById('canvas_div');
let width;
let height;
let centerX;
let centerY;

function resetScreenSize() {
    width = canvas.width = canvasDiv.offsetWidth;
    height = canvas.height = canvasDiv.offsetHeight;
    centerX = width / 2;
    centerY = height / 2;
    narrow = Math.min(width, height);
    rotarySize = narrow / 2;
    deflection = (2 / Math.sqrt(3) - 1) * rotarySize;
    distanceOfGravity = rotarySize / Math.sqrt(3);
}
resetScreenSize();

window.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('resize', resetScreenSize);
});

// ハウジングを描画する
function drawBackground() {
    context.beginPath();
    context.strokeStyle = 'rgba(0, 0, 0)';
    for (i = 0; i < Math.PI / 1; i += 0.001) {
        inAngle = i * 6;
        outAngle = i * 2 + Math.PI;
        let baseX = Math.cos(inAngle) * deflection / 2 + centerX;
        let baseY = Math.sin(inAngle) * deflection / 2 + centerY;
        let x = baseX + Math.cos(outAngle) * distanceOfGravity;
        let y = baseY + Math.sin(outAngle) * distanceOfGravity;
        context.lineTo(x, y);
    }
    context.moveTo(centerX + deflection / 2, centerY);
    context.arc(centerX, centerY, deflection / 2, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
}

function drawAnimation(timestamp) {
    context.clearRect(0, 0, width, height);
    drawBackground();
    angle = timestamp / RATE % Math.PI * 2;
    let inAngle = angle * 3;
    let baseX = Math.cos(inAngle) * deflection / 2 + centerX;
    let baseY = Math.sin(inAngle) * deflection / 2 + centerY;
    let angle1 = angle + Math.PI;
    let angle2 = angle1 + Math.PI * 2 / 3;
    let angle3 = angle2 + Math.PI * 2 / 3;

    context.beginPath();
    context.fillStyle = 'rgb(255, 0, 0)';
    context.arc(baseX, baseY, 2, 0, 2 * Math.PI);
    context.fill();

    context.beginPath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.arc(baseX, baseY, deflection, 0, Math.PI * 2);
    context.stroke();

    drawLine(baseX, baseY, angle1);
    drawLine(baseX, baseY, angle2);
    drawLine(baseX, baseY, angle3);
    window.requestAnimationFrame(drawAnimation);
}
function drawLine(baseX, baseY, angle) {
    context.fillStyle = 'rgb(0, 0, 0)';
    const x = baseX + Math.cos(angle) * distanceOfGravity;
    const y = baseY + Math.sin(angle) * distanceOfGravity;
    context.beginPath();
    context.arc(x, y, 2, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.arc(x, y, rotarySize, angle + (Math.PI * 5 / 6), angle + (Math.PI * 7 / 6));

    context.stroke();
}

window.requestAnimationFrame(drawAnimation);