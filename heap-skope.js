const gemHeapSkope = function () { // No parameter needed
    // Resource contained inside

/*
The gem mine does not exist outside the barricade of the hëap-skopes. The Lexscopistanians build the barricade around their facility AND the resource. a.k.a. Instead of being located in an outer scope to the function, the gem mine is enclosed by the scope of the `gemHeapSkope` function.
*/
    const GemMine = {
        "Onyx": {
            "kilograms": 453
        },
        "Amethyst": {
            "kilograms": 453
        },
        "Bloodstone": {
            "kilograms": 453
        },
        "Emerald": {
            "kilograms": 453
        }
    }

/*
Instead of processing the entirety of the resources in bulk - which is what the stâck-skope does - this skope will return an object that has a method for processing each type of mineral.

We're exposing the functionality of this skope to code in the outer scope, so that the order in which minerals are processed can be customized.

Hëap-skopes workshops can process 5 kilograms of a mineral with each work order. So every time the `process` function is invoked, subtract 5 from the amount of the requested mineral from the enclosed GemMine above.
*/
    return Object.create (null, {
        "products": {
            get: () => Object.keys(GemMine) //allows user to get the names of the gems
        },
        "process": {
            value: function (requestedMineral) {
                /*
                Subtract 5 from the total kilograms available in the gem mine, but make sure you stop when there are no minerals left.
                */
                let gemAmount = 0 //starting amount of gems before a mineral is processed
                
                //if the amount of gems is greater or equal to 5, then the gemAmount is 5
                    if (GemMine[requestedMineral].kilograms >= 5) {
                        gemAmount = 5
                    
                    } else { //if less than 5, then it is the remaining number
                        gemAmount = GemMine[requestedMineral].kilograms

                    }

                    GemMine[requestedMineral].kilograms -= gemAmount //subtract the gemAmount from the total amount of gems, eventually the number will equal 0


                    return {
                        "mineral": requestedMineral,
                        "amount":  gemAmount
                    }

            }
        }
    })
}

/*
The SkopeManager variable represents the object with the `process` method on it.
*/
const SkopeManager = gemHeapSkope()

/*
Process the gems in any order you like until there none left in the gem mine.
*/
    const processedGems = []

    SkopeManager.products.forEach(
        mineral => {
            let mineralProcessing = null
            do {
                mineralProcessing = SkopeManager.process(mineral) //the mineral currently being processed
                if(mineralProcessing.amount > 0) {
                    processedGems.push(mineralProcessing) //if amount greater than 0 then add to processedGems array
                }
            } while (mineralProcessing.amount === 5) //only process when you are able to process 5 gems at a time
        }
    )

// /*
// Create a generator for 30 storage containers, which is how many a hëap-skope is equipped with.
// */
    const gemContainerGenerator = function* () {
        let currentContainerId = 1
        const maximumContainers = 30

        while (currentContainerId <= maximumContainers) {
            yield { "id": currentContainerId, "type": "Mineral", "orders": [] }
            currentContainerId++
        }
    }
    //instance of gem container generator
    const gemContainerFactory = gemContainerGenerator()

// /*
// Place the gems in the storage containers, making sure that once a container has 565 kilograms of gems, you move to the next one.
// */
    //holds all the seperate gem containers
    const gemContainers = []
    
    //current container
    let currentContainer = gemContainerFactory.next().value

    //iterate over the processed gems array and put the gems in the containers
    processedGems.forEach(
        currentGem => {
            if(currentGem) {
                currentContainer.orders.push(currentGem) //adds current gem to the orders array of the current container
                let containerCapacity = 565/(currentContainer.orders.length * 5) //divides the maximum capcity by the current amount in the container given that each order has 5 gems

                if(containerCapacity === 1) { //when the container is full, add the container to the gemContainers array and start a new container
                gemContainers.push(currentContainer)
                currentContainer = gemContainerFactory.next().value
                }
            }
        }
    )

    if(currentContainer.orders.length > 0) { //even if the container isn't full, add it to the gemContainers array
        gemContainers.push(currentContainer)
    }

    console.log(gemContainers)