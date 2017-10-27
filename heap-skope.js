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
    return {
        "process": function (requestedMineral) {
        /*
        Subtract 5 from the total kilograms available in the gem mine, but make sure you stop when there are no minerals left.
        */
        
            let remainingGems = GemMine[requestedMineral].kilograms
            
            while (remainingGems > 0) {
                //if the remaingGems is greater or equal to 5 then process returns an amount of 5
                if ( remainingGems >= 5) {
                    
                    remainingGems -= 5 //after you return the amount, then subtract 5 from from the remaining number

                    return {
                    "mineral": requestedMineral,
                    "amount": 5
                    }
                    
                } 

                return {
                "mineral": requestedMineral,
                "amount":  remainingGems
                }

            }     
        }
    }
}

/*
The SkopeManager variable represents the object with the `process` method on it.
*/
const SkopeManager = gemHeapSkope()

/*
Process the gems in any order you like until there none left in the gem mine.
*/

console.log(SkopeManager.process("Amethyst"))
    // do {
    //     SkopeManager.process("Amethyst")
    
    // } while (SkopeManager.process("Amethyst") > 0)


// /*
// Create a generator for 30 storage containers, which is how many a hëap-skope is equipped with.
// */
//     const gemContainerGenerator = function* () {
//         let currentContainer = 1
//         const maximumContainers = 30

//         while (currentContainer <= maximumContainers) {
//             yield { "id": currentContainer, "type": "Mineral", "orders": [] }
//             currentContainer++
//         }
//     }
//     //instance of gem container generator
//     const gemContainerFactory = gemContainerGenerator()

// /*
// Place the gems in the storage containers, making sure that once a container has 565 kilograms of gems, you move to the next one.
// */
//     //holds all the seperate gem containers
//     const gemContainers = []
    
//     //current container
//     const currentContainer = gemContainerFactory.next().value