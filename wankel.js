const WIDTH = 500;
const HEIGHT = 500;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

const RATE = 1000;
const ROTARY_SIZE = 200;
const DEFLECTION = (2 / Math.sqrt(3) - 1) * ROTARY_SIZE;
const DISTANCE_OF_GRAVITY = ROTARY_SIZE / Math.sqrt(3);


const canvas = document.getElementById('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const context = canvas.getContext('2d');


// 各円を描画する。
function drawBackground() {
    context.beginPath();
    context.strokeStyle = 'rgba(0, 0, 0)';
    for (i = 0; i < Math.PI / 1; i += 0.001) {
        inAngle = i * 6;
        outAngle = i * 2 + Math.PI;
        const baseX = Math.cos(inAngle) * DEFLECTION / 2 + CENTER_X;
        const baseY = Math.sin(inAngle) * DEFLECTION / 2 + CENTER_Y;
        const x = baseX + Math.cos(outAngle) * DISTANCE_OF_GRAVITY;
        const y = baseY + Math.sin(outAngle) * DISTANCE_OF_GRAVITY;
        context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
}

function drawAnimation(timestamp) {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    drawBackground(context);
    step = timestamp / RATE % Math.PI;
    inAngle = step * 6;
    outAngle = step * 2;
    const baseX = Math.cos(inAngle) * DEFLECTION / 2 + CENTER_X;
    const baseY = Math.sin(inAngle) * DEFLECTION / 2 + CENTER_Y;
    outAngle1 = outAngle + Math.PI;
    outAngle2 = outAngle1 + Math.PI * 2 / 3;
    outAngle3 = outAngle2 + Math.PI * 2 / 3;
    context.fillStyle = 'rgb(0, 0, 0)';
    context.strokeStyle = 'rgba(0, 0, 0, 0)';
    context.beginPath();
    context.arc(baseX, baseY, 2, 0, 2 * Math.PI);
    context.fill();
    drawLine(baseX, baseY, outAngle1);
    drawLine(baseX, baseY, outAngle2);
    drawLine(baseX, baseY, outAngle3);
    window.requestAnimationFrame(drawAnimation);
}
function drawLine(baseX, baseY, angle) {
    context.fillStyle = 'rgb(0, 0, 0)';
    context.strokeStyle = 'rgba(0, 0, 0, 0)';
    const x = baseX + Math.cos(angle) * DISTANCE_OF_GRAVITY;
    const y = baseY + Math.sin(angle) * DISTANCE_OF_GRAVITY;
    context.beginPath();
    context.arc(x, y, 2, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.arc(x, y, ROTARY_SIZE, angle + (Math.PI * 5 / 6), angle + (Math.PI * 7 / 6));

    context.stroke();
}

drawBackground();
window.requestAnimationFrame(drawAnimation);