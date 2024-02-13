class InvisibleFenceBlocker {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x,y,width,height});
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
    }

    update() {
        this.updateBB();
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
        }
    }
}
