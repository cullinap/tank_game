
function deBugLines() {
    // 400 line
    ctx.beginPath();
    ctx.moveTo(400,0);
    ctx.lineTo(400, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 450 line
    ctx.beginPath();
    ctx.moveTo(450,0);
    ctx.lineTo(450, canvas.height);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 495
    ctx.beginPath();
    ctx.moveTo(495,0);
    ctx.lineTo(495, canvas.height);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 100 line
    ctx.beginPath();
    ctx.moveTo(0,100);
    ctx.lineTo(canvas.width, 100);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 150 line
    ctx.beginPath();
    ctx.moveTo(0,150);
    ctx.lineTo(canvas.width, 150);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 195 line
    ctx.beginPath();
    ctx.moveTo(0,195);
    ctx.lineTo(canvas.width, 195);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();
}
