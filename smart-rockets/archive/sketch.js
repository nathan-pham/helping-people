// defining vars
let creatures = [];
let goal;
let spawn;
let generation = 1;
let geneLength = 250;
let maxGen = 250;
let maxMutate = 0.2;
let geneIndex = 1;

// setup function from p5js
function setup() {
    createCanvas(800, 800);

    spawn = createVector(width/2, 100);
    goal = new Goal(width/2 - 16, 700, 32, 32);
    
    // making first generation of creatures
    for(let i = 0; i < 100; i++){
        creatures.push(new Creature(spawn.x, spawn.y, goal, 5));
        creatures[i].generateNewGenes(geneLength);
    }
}

function draw() {
    background(109,163,127)
    goal.draw();

    let avgFitness = 0;
    let bestFitness = -Infinity;

    // doing all the creature functions and calculating best and average fitness
    for(let i = 0; i < creatures.length; i++){
        creatures[i].calcFitness();
        creatures[i].update();
        creatures[i].draw();

        avgFitness += creatures[i].fitness;

        if(creatures[i].fitness > bestFitness){
            bestFitness = creatures[i].fitness
        }
    }

    // avg fitness making poggers
    avgFitness = avgFitness/creatures.length

    // writing text to screen
    fill(255)
    textSize(16)

    text("AVG FITNESS:", 10, 20)
    text(avgFitness.toFixed(2), 10, 40)

    text("BEST FITNESS:", 10, 70)
    text(bestFitness, 10, 90)

    text("GENERATION:", 10, 120)
    text(generation, 10, 140)

    // if creatures have gone through all "genes" (instructions for moving) go to new generation
    if(geneIndex >= geneLength) {
        generation++;

        // selecting candidates for parents
        let candidates = []

        for(let i = 0; i < creatures.length; i++) {
            creatures[i].calcFitness();

            // i add more of a creature if their fitness is higher so that a random function will have a higher chance to pick the better creatures as parents
            for(let j = 0; j < 2 ** (creatures[i].fitness * 10); j++) {
                candidates.push(creatures[i]);
            }
        }

        // creating new generation of creatures

        for(let i = 0; i < 100; i++){

            // generating new genes based of the parents and a maxMutate value
            creatures[i].generateGenesFromParents(candidates[Math.floor(random(candidates.length))], candidates[Math.floor(random(candidates.length))], maxMutate);
            creatures[i].pos = createVector(spawn.x, spawn.y)
            creatures[i].index = 1
        }

        console.log(creatures)
        
        geneIndex = 0;
    }

    geneIndex ++
}