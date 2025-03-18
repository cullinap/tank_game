obj = {x:700,y:225}


function generateObject() {
    obj.x = Math.floor(Math.random() * (750 - 650 + 1)) + 700;
    console.log(obj.x)

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