let terrain = [];

function generateTerrain() {
    let flatGroundWidth = 0;
    
    if (flatGroundSwitch) {
        flatGroundWidth = canvas.width
    }

    let height = canvas.height * 0.7;

    for(let x=0; x < terrainWidth; x+=terrainResolution) {
        if (x < flatGroundWidth) {
            terrain.push({x: x, y: height});
        } else {
            height += (Math.random() - 0.5) * 15;
            height = Math.min(canvas.height - 50, Math.max(canvas.height * 0.4, height));

            terrain.push({x:x, y:height});
        }
    }
    
    if (terrain[terrain.length - 1].x < canvas.width) {
        terrain.push({x:canvas.width, y:canvas.height});
    }
}

function drawTerrain() {
    ctx.fillStyle = "#654321";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);

    for(let i=0; i<terrain.length; i++) {
        ctx.lineTo(terrain[i].x, terrain[i].y); 
    }

    ctx.lineTo(canvas.height, canvas.width);
   // ctx.lineTo(0, canvas.width);
    ctx.closePath();
    ctx.fill();
}