class NextDayCutScene{
    constructor(game) {
    Object.assign(this, { game});
        this.removeFromWorld = false;
        this.elapsed = 0;

    }; 


    update(){
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 3.5) {
            this.removeFromWorld = true;
        };

        if(PARAMS.CANVAS_HEIGHT * 0.15 - (this.elapsed-2) * 100 +100 > PARAMS.CANVAS_HEIGHT * 0.18 )
        this.sunPositionY = PARAMS.CANVAS_HEIGHT * 0.15 - (this.elapsed-2) * 120 +100;


    };
    draw(ctx) {
        

        // ctx.fillStyle = "Black";
        // ctx.fillRect(0,0, 2000, 1000);

        // Draw sky
        ctx.fillStyle = '#820';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT * 0.5);
        // Draw sun
        ctx.fillStyle = '#ff0';
        ctx.beginPath();
        ctx.arc(PARAMS.CANVAS_WIDTH * 0.45, this.sunPositionY, 50, 0, 2 * Math.PI);
        ctx.fill();

        // Draw sea
        ctx.fillStyle = '#007';
        ctx.fillRect(0, PARAMS.CANVAS_HEIGHT * 0.5, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT * 0.5);

    
        //Add Credit for the idea. 
        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "white";
        this.game.ctx.fillText( "Idea Credit: codepen.io/TheBrutalTooth  ",10 ,PARAMS.CANVAS_HEIGHT * 0.5 + 15);


        let midpointX = PARAMS.CANVAS_WIDTH/2;
        let midpointY = PARAMS.CANVAS_HEIGHT/2;

        ctx.font = '50px "Press Start 2P"';
        ctx.fillStyle = "white";
        ctx.fillText( "Day  "+ (PARAMS.DAYCOUNTER + 1), midpointX - midpointX*0.15 ,midpointY- midpointY*0.15);

    }

}
 