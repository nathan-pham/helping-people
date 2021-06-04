class Creature {
    done = false
    fitness = 0
    genes = []
    maxSpeed = 2

    constructor(x, y, geneLength) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)

        for(let i = 0; i < geneLength; i++){
            this.genes.push(p5.Vector.random2D())
        }
    }

    respawn(x, y) {
        this.pos = createVector(x, y)
    }

    render() {
        this.done
            ? fill(255, 140, 25)
            : fill(155, 232, 181)

        noStroke()
        ellipse(this.pos.x, this.pos.y, 16, 16)
    }

    update(goal, index) {
        if((this.pos.x > goal.pos.x && this.pos.x < goal.pos.x + goal.size.x && this.pos.y > goal.pos.y && this.pos.y < goal.pos.y + goal.size.h) || this.done) {
            this.done = true
        } else {
            this.acc.add(this.genes[index])
            this.vel.add(this.acc)
            this.pos.add(this.vel)
            this.acc.mult(0)

            this.vel.limit(this.maxSpeed)
        }
    }

    crossover(parentA, parentB) {
        this.genes = []
        let divider = floor(random(parentA.genes.length))
    
        for(let i = 0; i < parentA.genes.length; i++) {
            this.genes.push(i < divider
                ? parentA.genes[i]
                : parentB.genes[i]
            )
        }
    }

    mutate(mutationRate) {
        for(let i = 0; i < this.genes.length; i++) {
            if(random() < mutationRate) {
                this.genes[i] = p5.Vector.random2D()
            }
        }
    }
    
    calculateFitness(goal) {
        this.fitness = round(map(this.pos.dist(goal.pos), 0, 800, 1, 0)*100)/100;
    }
}