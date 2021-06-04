let creatures = []
let generation = 1
let geneIndex = 1
let geneLength = 250
let mutationRate = 0.01
let populationCount = 100
let goal, spawn

function setup() {
    createCanvas(500, 500)

    spawn = createVector(width / 2, 100)
    goal = new Goal(width / 2 - 16, height - 100, 32, 32)

    for(let i = 0; i < populationCount; i++) {
        creatures.push(new Creature(spawn.x, spawn.y, geneLength))
    }
}

function draw() {
    background(109,163,127)
    goal.render()

    for(const creature of creatures) {
        creature.update(goal, geneIndex)
        creature.render()
    }
    
    fill(255)
    textSize(16)

    text(`GENE_INDEX: ${geneIndex}`, 10, 20)
    text(`GENERATION: ${generation}`, 10, 40)

    geneIndex++

    if(geneIndex >= geneLength) {
        geneIndex = 0
        generation++

        let candidates = []

        for(const creature of creatures) {
            creature.calculateFitness(goal)

            for(let j = 0; j < 2 ** (creature.fitness * 10); j++) {
                candidates.push(creature)
            }
        }

        const selectCandidate = () => candidates[floor(random(candidates.length))]

        for(const creature of creatures) {
            const parentA = selectCandidate()
            const parentB = selectCandidate()

            creature.crossover(parentA, parentB)
            creature.mutate(mutationRate)
            creature.respawn(spawn.x, spawn.y)
        }
    }
}