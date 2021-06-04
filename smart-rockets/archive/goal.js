// goal for creatures to reach
class Goal {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.size = createVector(w, h);
    }

    // draw end goal
    draw() {
        fill(39,163,76);
        noStroke();

        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}