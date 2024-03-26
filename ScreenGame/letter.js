class Letter {
    constructor(game, x, y) {
        this.game = game;

        // Updated exitBB to bottom right
        this.exitBB = new BoundingBox(2.85*PARAMS.CANVAS_WIDTH / 4 + (60 - 25) / 2 - 25/2, PARAMS.CANVAS_HEIGHT / 4.5 + (60 + 25) / 2 - 25*1.5, 50, 50);
        this.clickOnExit = false;
    }
    update() {
       // console.log(this.game.camera.enities);
        if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);

            if (mouseBB.collide(this.exitBB) && !this.clickOnExit) {
                 this.clickOnExit = true;
                this.removeFromWorld = true;
                console.log("click exit");
            }

            // Reset click
            this.game.click = null;
        }
    }
    draw(ctx) {
        ctx.font = '15px "Press Start 2P"'; // Keeping text size at 15px
        ctx.fillStyle = 'rgba(254,228,177,255)';
    
        // Calculate the text height
        const dear = "Dear my son,"
        const text = "I know that you feel bad because you could not find a job after graduating. It is not you; it is the job market. Now I am glad that you are back. I am sorry I forgot to mention about all the monsters around the farm. Make sure you are strong enough to fight them, you can increase Damage and HP by leveling up via farming. I raised a wolfdog in the farm to protect the plants. There is a fishing spot for you to catch. You can eat fish to recover your lost HPs. You can also feed them to the wolfdog. She loves fishes.";
        const maxWidth = PARAMS.CANVAS_WIDTH / 2 - 20; // Maximum width for the text
        const lineHeight = 20; // Adjust line height as needed
        const lines = this.wrapText(text, maxWidth, ctx);
        const textHeight = lines.length * lineHeight;
    
        // Draw the dynamic rectangle
        ctx.strokeStyle = 'rgba(90,22,7,255)';

        ctx.fillRect(PARAMS.CANVAS_WIDTH / 4, PARAMS.CANVAS_HEIGHT / 4 - lineHeight, PARAMS.CANVAS_WIDTH / 2, textHeight + 20 + lineHeight + PARAMS.CANVAS_HEIGHT / 4  );
        
        ctx.strokeRect(PARAMS.CANVAS_WIDTH / 4, PARAMS.CANVAS_HEIGHT / 4 - lineHeight, PARAMS.CANVAS_WIDTH / 2, textHeight + 20 + lineHeight + PARAMS.CANVAS_HEIGHT / 4  );
        // Draw Information Text
        ctx.fillStyle = 'rgba(90,22,7,255)';
        const startY = PARAMS.CANVAS_HEIGHT / 3 + 20; // Adjust starting Y position
        ctx.fillText(dear, PARAMS.CANVAS_WIDTH / 4 + 10,  PARAMS.CANVAS_HEIGHT / 4 + 20);
        lines.forEach((line, index) => {
            ctx.fillText(line, PARAMS.CANVAS_WIDTH / 4 + 10, startY + index * lineHeight);
        });
        ctx.fillText("Be Strong", PARAMS.CANVAS_WIDTH / 4 + 10,  startY + (lines.length+2) * lineHeight);
        ctx.fillStyle = 'rgba(254,228,177,255)';

        // Draw Exit Box at bottom right (moved 50px to the left)
        
        // Centering text within the box
        ctx.fillStyle = 'rgba(90,22,7,255)';
        ctx.font = '25px "Press Start 2P"'; // Keeping text size at 15px

        const exitText = "X";
        const exitTextWidth = 25;
        const exitTextHeight = 25; // Assuming the font size is 25px
        ctx.fillText(exitText, 2.85*PARAMS.CANVAS_WIDTH / 4 + (60 - exitTextWidth) / 2, PARAMS.CANVAS_HEIGHT / 4.5 + (60 + exitTextHeight) / 2);
        ctx.strokeStyle = 'rgba(90,22,7,255)';

        ctx.strokeRect(2.85*PARAMS.CANVAS_WIDTH / 4 + (60 - exitTextWidth) / 2 - exitTextHeight/2, PARAMS.CANVAS_HEIGHT / 4.5 + (60 + exitTextHeight) / 2 - exitTextHeight*1.5, 50, 50);

        // Debug Rectangle
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 190, PARAMS.CANVAS_HEIGHT - 80, 140, 60);
        }
    }
    wrapText(text, maxWidth, ctx) {
        const words = text.split(' ');
        let lines = [];
        let currentLine = '';
    
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth || i === 0) {
                currentLine += (i === 0 ? '' : ' ') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
}