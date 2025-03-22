obj = {x:700,y:225}


function generateObject() {
    // get random value between 0-100
    // floor it to get just the integer
    // add 700 to keep it in the 700 area
    // math random = 0.604 * 101 = 60.4, floor = 60, + 700
    let randValue = Math.random();
    let locDeterminer = 0;

    if (randValue <= 0.5) {
        locDeterminer = 300;
    } else {
        locDeterminer = 650;
    }
    obj.x = Math.floor(Math.random() * (750 - 650 + 1)) + locDeterminer;
    

    // find the x,y >= 700 -/+ TR (700-35) & (700+35)
    let leftPoint = terrain.find(t => t.x >= obj.x - terrainResolution);
    let rightPoint = terrain.find(t => t.x >= obj.x + terrainResolution);

    if (leftPoint && rightPoint) {
        let deltaX = rightPoint.x - leftPoint.x; //(735-665 = 70)
        let deltaY = rightPoint.y - leftPoint.y; //(whatever it is at that point)
    
        obj.y = leftPoint.y -20;
    }
}


function drawObject() {
    ctx.save();
    ctx.translate(obj.x,obj.y); //x,y
    ctx.fillstyle = "red";
    ctx.fillRect(-20, 0, 40, 40);
    ctx.restore();
}