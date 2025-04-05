
function drawOpeningScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw background color
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Cannon Game', canvas.width/2, canvas.height/3);

    //Draw instruction 
    ctx.font = '24px Arial';
    ctx.fillText('Press SPACE to start', canvas.width/2, canvas.height/1.5);
}

function drawLevelScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Level: ${currentLevel}`, canvas.width/2, canvas.height/3);

    //Draw instruction 
    ctx.font = '24px Arial';
    ctx.fillText('Press SPACE to continue', canvas.width/2, canvas.height/1.5);
}