class Start {
    constructor(game, x, y) {
        this.game = game;

        // Adjusted bounding box positions based on PARAMS.CANVAS_WIDTH and PARAMS.CANVAS_HEIGHT
        this.startBB = new BoundingBox(548+200, 248, 304, 54);
        this.aboutBB = new BoundingBox(548+200, 348, 304, 54);
        this.creditBB = new BoundingBox(548+200, 448, 304, 54);
        this.mouseBB = new BoundingBox(0, 0, 1, 1);

        this.clickOnStart = false;
        this.clickOnAbout = false;
        this.clickOnCredit = false;
    }

    update() {
        if (this.game.click) {
            this.game.camera.countDeath =0;
                const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);
            console.log(this.game.click);
            if (mouseBB.collide(this.startBB) && !this.clickOnStart) {
                this.game.camera.loadMap();
                this.clickOnStart = true;
                this.removeFromWorld = true;
            } else if (mouseBB.collide(this.aboutBB) && !this.clickOnAbout) {
                this.game.addEntity(new About(this.game));
                this.clickOnAbout = true;
                console.log("MOUSE CLICK ON ABOUT");
                this.removeFromWorld = true;
            } else if (mouseBB.collide(this.creditBB) && !this.clickOnCredit) {
                this.game.addEntity(new Credit(this.game));
                this.clickOnCredit = true;
                console.log("MOUSE CLICK ON CREDIT");
                this.removeFromWorld = true;
            }

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
         
        ctx.font = '25px "Press Start 2P"'
       ctx.fillStyle = 'rgba(0, 0, 0, 1)';
       ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);


        ctx.fillStyle = 'white';
        ctx.fillRect(548+200, 248, 304, 54);
        ctx.fillRect(548+200, 348, 304, 54);
        ctx.fillRect(548+200, 448, 304, 54);
        
        ctx.fillStyle = "green";
        ctx.fillRect(550+200, 250, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("Start", 650+200, 390 * 0.75);

        ctx.fillStyle = "green";
        ctx.fillRect(550+200, 350, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("About", 650+200, 525 * 0.75);

        ctx.fillStyle = "green";
        ctx.fillRect(550+200, 450, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("Credit", 650+200, 650 * 0.75);

       

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(548+200, 248, 304, 54);
            ctx.strokeRect(548+200, 348, 304, 54);
            ctx.strokeRect(548+200, 448, 304, 54);
        }
     
        if (this.game.mouse) {
            const getMouseHover = this.game.mouse;
            this.mouseBB = new BoundingBox(getMouseHover.x, getMouseHover.y, 1, 1);
    
         
            if (this.mouseBB.collide(this.startBB) || this.mouseBB.collide(this.creditBB)||this.mouseBB.collide(this.aboutBB) ) {
            
             if(  this.mouseBB.collide(this.startBB)){
                ctx.fillStyle = "Blue";
                ctx.fillRect(550+200, 250, 300, 50);
                ctx.fillStyle = 'white';
                ctx.fillText("Start", 650+200, 390 * 0.75);
                }
                if(this.mouseBB.collide(this.aboutBB)){
                    ctx.fillStyle = "Blue";
        ctx.fillRect(550+200, 350, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("About", 650+200, 525 * 0.75);
                    }

                if(  this.mouseBB.collide(this.creditBB)){
                    ctx.fillStyle = "Blue";
                    ctx.fillRect(550+200, 450, 300, 50);
                    ctx.fillStyle = 'white';
                    ctx.fillText("Credit", 650+200, 650 * 0.75);
                    }

            } else {
                ctx.fillStyle = 'white'; // Reset fill style to original color
                ctx.fillStyle = "green";
        ctx.fillRect(550+200, 250, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("Start", 650+200, 390 * 0.75);

        ctx.fillStyle = "green";
        ctx.fillRect(550+200, 450, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("Credit", 650+200, 650 * 0.75);

        ctx.fillStyle = "green";
        ctx.fillRect(550+200, 350, 300, 50);
        ctx.fillStyle = 'white';
        ctx.fillText("About", 650+200, 525 * 0.75);
            }

   
        }}
}

class About {
    constructor(game, x, y) {
        this.game = game;

        // Updated exitBB to bottom right
        this.exitBB = new BoundingBox(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
        this.clickOnExit = false;
    }

    update() {
        console.log(this.game.camera.enities);
        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB) && !this.clickOnExit) {
                 this.clickOnExit = true;
                this.game.addEntity(new Start(this.game));
                this.removeFromWorld = true;
                console.log("click exit");
            }

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
        ctx.font = '25px "Press Start 2P"';
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

        // Draw Information Text
        ctx.fillStyle = 'white';
         // Centered text
         ctx.fillText("The character is a CS graduate who cannot find a job", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("The character is a CS graduate who cannot find a job").width / 2, 350 * 0.75);
         ctx.fillText("So, he decides to return and help his family's farm", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("So, he decides to return and help his family's farm").width / 2, 450 * 0.75);
        ctx.fillText("However, they don't tell him what happens to the farm at night.", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("However, they don't tell him what happens to the farm at night.").width / 2, 550 * 0.75);

        // Draw Exit Box at bottom right (moved 50px to the left)
        ctx.fillStyle = "green";
        ctx.fillRect(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
        ctx.fillStyle = 'white';

        // Centering text within the box
        const exitText = "Exit";
        const exitTextWidth = ctx.measureText(exitText).width;
        const exitTextHeight = 25; // Assuming the font size is 25px
        ctx.fillText(exitText, PARAMS.CANVAS_WIDTH - 190 + (140 - exitTextWidth) / 2, PARAMS.CANVAS_HEIGHT - 80 + (60 + exitTextHeight) / 2);

        // Debug Rectangle
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
        }
    }
}






class Credit {
    constructor(game, x, y) {
        this.game = game;
        this.exit = false;
        this.exitBB = new BoundingBox(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);

    }

    update() {
        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB)) {
                this.clickOnExit = true;
                this.game.addEntity(new Start(this.game));
                this.removeFromWorld = true;
                console.log("MOUSE CLICK ON EXIT");
            } 

            // Reset click
            this.game.click = null;
        }
    }

    draw(ctx) {
     

        ctx.font = '25px "Press Start 2P"'
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

   
       ctx.fillStyle = 'white';
          // Centered text
          ctx.fillText("This game is created By:", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("This game is created By:").width / 2, 390 * 0.75);
          ctx.fillText("Tin Phu, Thinh Le, Lixin Wang", PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("Tin Phu, Thinh Le, Lixin Wang").width / 2, 490 * 0.75);
     // Draw Exit Box at bottom right (moved 50px to the left)
     ctx.fillStyle = "green";
     ctx.fillRect(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
     ctx.fillStyle = 'white';

     // Centering text within the box
     const exitText = "Exit";
     const exitTextWidth = ctx.measureText(exitText).width;
     const exitTextHeight = 25; // Assuming the font size is 25px
     ctx.fillText(exitText, PARAMS.CANVAS_WIDTH - 190 + (140 - exitTextWidth) / 2, PARAMS.CANVAS_HEIGHT - 80 + (60 + exitTextHeight) / 2);
   
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
           
            
        }
    }


}
