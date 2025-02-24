let target = { x: Math.random() * 500 + 250, y: Math.random() * 200 + 100, radius: 15}

function drawTarget() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius, 0, Math.PI *2);
    ctx.fill();
}

// function resetTarget() {

// }