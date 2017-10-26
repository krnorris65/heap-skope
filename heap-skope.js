//per container: 565 kilograms of minerals & gems
//heap skopes: 30 containers
//process 5 kg at a time


const gemHeapSkope = function () {
    const gemMine1 = {
        "Coal": {
            "kilograms": 5302
        },
        "Gold": {
            "kilograms": 2775
        }
    }

    const gemMine2 = {
        "Iron": {
            "kilograms": 3928
        },
        "Cooper": {
            "kilograms": 901
        }
    }

    return { 
        "process": function (requestedMineral) {
            const currentAmount = gemMine1[requestedMineral].kilograms
            
    }

    }
    
   
}

console.log(gemHeapSkope())