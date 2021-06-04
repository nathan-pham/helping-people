class Creature {
    constructor(x, y, goal, vel){
        this.pos = createVector(x, y);
        this.goal = goal;
        this.done = false;
        this.index = 0;
        this.vel = vel;
        this.fitness = 0;
        this.genes = [];
    }

    // draw creature
    draw() {
        if(this.done){fill(255,140,25)}else{fill(155,232,181)}
        noStroke();
        ellipse(this.pos.x, this.pos.y, 16, 16)
    }

    // update position and if it creature has reached the end goal
    update() {
        if(!this.done && this.index < this.genes.length) {
            if(this.pos.x > this.goal.pos.x && this.pos.x < this.goal.pos.x + this.goal.size.x && this.pos.y > this.goal.pos.y && this.pos.y < this.goal.pos.y + this.goal.size.h) {
                this.done = true;
                return;
            }

            this.pos.x += this.vel * this.genes[this.index].x
            this.pos.y += this.vel * this.genes[this.index].y
            this.index++
        }
    }
    
    // generating genes RANDOMLY
    generateNewGenes(length) {
        this.genes = [];
        for(let i = 0; i < length; i++){
            this.genes.push(p5.Vector.random2D());
        }
    }

    // generating genes with PARENTS
    generateGenesFromParents(parent1, parent2, maxMutate) {
        this.genes = [];
        for(let i = 0; i < max(parent1.genes.length, parent2.genes.length); i++){
            let parent = Math.round(random());
            if(parent == 1){
                this.genes.push(parent1.genes[i] + random(-maxMutate, maxMutate));
            } else {
                this.genes.push(parent2.genes[i] + random(-maxMutate, maxMutate))
            }
        }
    }

    // calculating fitness based on the distance to the end goal
    calcFitness() {
        this.fitness = round(map(this.pos.dist(this.goal.pos), 0, 800, 1, 0)*100)/100;
    }
}