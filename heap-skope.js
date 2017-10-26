//generator to create 10 stack-skope containers
const treeContainerGenerator = function* () {
    let currentContainer = 1
    const maximumContainers = 10

    while (currentContainer <= maximumContainers) {
        yield { "id": currentContainer, "type": "Tree", "logs": [] }
        currentContainer++
    }
}

//instance of tree container generator
const treeContainerFactory = treeContainerGenerator()

//forest of 37 total trees, 4 logs can be made from each tree
const forest = [
    {
        "type": "Oak",
        "trees": 9
    },
    {
        "type": "Pine",
        "trees": 12
    },
    {
        "type": "Ash",
        "trees": 6
    },
    {
        "type": "Balsa",
        "trees": 10
    }
]


const cropStackSkope = function (trees) {
    // Functionality to convert each tree into 4 logs
    const processedTrees = trees.map( //iterate over trees and return and array of new objects to show how many logs each tree produces

        currentTree => ({
            "type": currentTree.type,
            "logs": currentTree.trees * 4
        })

    )
    
    return processedTrees
    
}
//array of tree containers
cropStackSkope.containers = []
// Start filling up the 10 available storage containers, 15 logs per container
let allLogs = cropStackSkope(forest)



let currentContainer = treeContainerFactory.next().value

//processedTrees in an array of the type of tree and how many logs of each
allLogs.forEach(
    currentTreeLogs => { //looking at each set of logs
        for(let i = 0; i < currentTreeLogs.logs; i++) {
            //add new tree into container
            const logType = {"type": currentTreeLogs.type}
            currentContainer.logs.push(logType)  //each container: { "id": currentContainer, "type": "Tree", "logs": [] }
            
            //only add 15 logs per container
            if(currentContainer.logs.length === 15) {
                cropStackSkope.containers.push(currentContainer)
                currentContainer = treeContainerFactory.next().value
            }
        }
    }
)




console.log(cropStackSkope.containers)