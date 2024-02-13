class InvisibleLakeBlocker {
    constructor(game) {
        Object.assign(this, { game });


        this.updateBB();

    };
    updateBB() {
        this.BB = new BoundingBox(64 * 21 - this.game.camera.x, 300 - this.game.camera.y + 140, 700, 60 * 10 - 140);
        //  console.log(this.BB);
        //        ctx.fillRect(64*21 - this.game.camera.x,300- this.game.camera.y, 700, 60*10);

    }

    update() {
        this.updateBB();
    };
    draw(ctx) {

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(64 * 21 - this.game.camera.x, 300 - this.game.camera.y + 140, 700, 60 * 10 - 140);


        }

    }

}
