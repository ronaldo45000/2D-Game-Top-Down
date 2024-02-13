class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });
        //A         B
        //D         C

        this.left = x; //B
        this.top = y; //
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) {
            this.checkCollisionSides(oth);
            return true;
        }
        
        return false;
    };

    overlap(oth) {
        let a_half = {x: this.width / 2, y: this.height / 2};
        let b_half = {x: oth.width / 2, y: oth.height / 2};

        let a_center = {x: this.right - a_half.x, y: this.bottom - a_half.y};
        let b_center = {x: oth.right - b_half.x, y: oth.bottom - b_half.y};

        let ox = a_half.x + b_half.x - Math.abs(a_center.x - b_center.x);
        let oy = a_half.y + b_half.y - Math.abs(a_center.y - b_center.y);

        return {x: ox, y: oy};
    };
    checkCollisionSides(oth) {
        var collision = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };

        // Check left side collision
        if (this.right > oth.left && this.left < oth.left &&
            this.bottom > oth.top && this.top < oth.bottom) {
            collision.left = true;
         //   console.log("Collision on Left")
        }

        // Check right side collision
        if (this.left < oth.right && this.right > oth.right &&
            this.bottom > oth.top && this.top < oth.bottom) {
            collision.right = true;
          //  console.log("Collision on right")
        }

        // Check top side collision
        if (this.bottom > oth.top && this.top < oth.top &&
            this.right > oth.left && this.left < oth.right) {
            collision.top = true;
         //   console.log("Collision on top")
        }

        // Check bottom side collision
        if (this.top < oth.bottom && this.bottom > oth.bottom &&
            this.right > oth.left && this.left < oth.right) {
            collision.bottom = true;
          //  console.log("Collision on bottom")

        }

        return collision; // Return collision details
    };
};