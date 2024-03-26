class InvisibleMonsterBlocker {
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
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
        }
    }
}
class InvisibleSnowMapDoor {
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
            ctx.strokeStyle = 'White';
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
        }
    }
}

class Bed{
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
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
        }
    }
}
