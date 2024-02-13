class ForestRedTree {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.radius = 99 / 2;
        this.x = x;
        this.y = y;
        this.height = 123;
        this.width = 93;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/forest.png");
        this.updateBB();

    };

    updateBB() {
        this.BB = new BoundingBox(this.x - this.game.camera.x - this.width / 4, this.y - this.game.camera.y + this.height / 42, this.width / 2, this.height / 4);
    }

    update() {
        this.updateBB();
    };
    
    draw(ctx) {

        ctx.drawImage(this.spritesheet, 97, 159, this.width, this.height, this.x - this.game.camera.x - this.width / 2, this.y - this.game.camera.y - this.height / 2, this.width, this.height);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x - this.game.camera.x - this.width / 4, this.y - this.game.camera.y + this.height / 4, this.width / 2, this.height / 4);

            // ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();


            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([]);
        }

    }

}
