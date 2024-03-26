class LoadingScreen {
    constructor(game, x, y) {
        this.game = game;
       // this.BB = new BoundingBox(x, y, 1, 1);
    }

    update() {
        this.removeFromWorld = true;    
    }

    draw(ctx) {
        ctx.font = '25px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, 2500, 2500);
         ctx.fillStyle = 'White';

        ctx.fillText("Entering Portal...", 540 , 500 * 0.75);
        ctx.fillStyle = "green";
        ctx.fillRect(500, 400, 500, 50);

    }
}

class BossZone {
    constructor(game, x, y) {
        this.game = game;
       // this.BB = new BoundingBox(x, y, 1, 1);
    }

    update() {
        this.removeFromWorld = true;    
    }

    draw(ctx) {
        ctx.font = '25px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, 2500, 2500);
         ctx.fillStyle = 'White';

        ctx.fillText("Requirement for this final boss is lv " + this.game.character.levelToEnter, 340 , 500 * 0.75);
        ctx.fillStyle = "purple";
        ctx.fillRect(500, 400, 500, 50);
    }
}


class GameOver {
    constructor(game, x, y) {
        this.game = game;
       // this.BB = new BoundingBox(x, y, 1, 1);
       this.back = false;
       this.exitBB = new BoundingBox(570+200, 680, 150, 40); 
       ASSET_MANAGER.pauseBackgroundMusic();
       ASSET_MANAGER.playMusic("./music/CornfieldChaseShort.mp3");

    }

    update() {

        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB)) {
                this.back = true;
                this.game.addEntity(new Start(this.game));
                this.removeFromWorld = true;
                console.log("MOUSE CLICK ON BACK");
            } 

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
      
        ctx.font = '35px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
         ctx.fillStyle = 'White';
        ctx.fillText("YOU ARE DEAD!", 430+200 , 500 * 0.75);

        ctx.fillText("Back", 570+200, 950 * 0.75);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(570+200, 680, 150, 40);
           
            
        }
    }
}

class EndGame {
    constructor(game, x, y) {
        this.game = game;
        this.exit = false;
        this.exitBB = new BoundingBox(600+200, 680, 100, 40);
        this.endgame = false;
    }

    update() {
        this.endgame = true;
        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB)) {
                this.exit = true;
                this.game.addEntity(new Start(this.game));
                this.removeFromWorld = true;
                console.log("MOUSE CLICK ON EXIT");
                this.endgame = true;
            } 

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
     

        ctx.font = '25px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

        // ctx.fillStyle = 'white';
        // ctx.fillRect(348, 248, 304, 54);
        // ctx.fillRect(348, 348, 304, 54);
        // ctx.fillRect(348, 448, 304, 54);

      

        // ctx.fillStyle = "green";
        // ctx.fillRect(350, 250, 300, 50);
       ctx.fillStyle = 'white';
        ctx.fillText("Congratulation, you beat the game!", 250+200, 390 * 0.75);

     
        ctx.fillText("Back", 600+200, 950 * 0.75);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(600+200, 680, 100, 40);
           
            
        }
    }
}


class Guide {
    constructor(game, x, y) {
        this.game = game;
        this.exit = false;
        this.exitBB = new BoundingBox(PARAMS.CANVAS_WIDTH/2.2, PARAMS.CANVAS_HEIGHT * 0.9, 100, 40);
    }

    update() {
        if (this.game.click) {
            console.log(this.game.click)
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB)) {
                this.exit = true;
            } else{
                this.exit = false;
            }

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
     

    //     ctx.font = '20px "Press Start 2P"'
    //  ctx.fillStyle = 'rgba(0, 96, 126, 0.5)';
    //     ctx.fillRect(0, 700, 1900, 400);



    //    ctx.fillStyle = 'white';
    //     ctx.fillText("There is a skill that you can obtain by defeat a boss in snowmap.", 80, 990 * 0.75);
    //     ctx.fillText("The boss can one shot you if you are too weak.", 80, 1050 * 0.75);
    //     ctx.fillText("Okay", 680, 1150 * 0.75);
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = 'rgba(0, 96, 126, 0.5)';
    ctx.fillRect(0, PARAMS.CANVAS_HEIGHT * 0.7, 1900, 400);

    ctx.fillStyle = 'white';
    ctx.fillText("U need to be at least level 3 to unlock T skill", PARAMS.CANVAS_WIDTH/4, PARAMS.CANVAS_HEIGHT * 0.75);
    ctx.fillText("Okay", PARAMS.CANVAS_WIDTH/2.2, PARAMS.CANVAS_HEIGHT * 0.9 + 20);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(PARAMS.CANVAS_WIDTH/2.2, PARAMS.CANVAS_HEIGHT * 0.9, 100, 40);
           
            
        }
    }
}
