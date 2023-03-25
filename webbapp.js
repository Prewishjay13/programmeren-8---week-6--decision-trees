import { DecisionTree } from "../libraries/decisiontree.js"

function loadSavedModel() {
    fetch("model/model.json")
        .then((response) => response.json())
        .then((model) => {
            console.log(model);
            modelLoaded(model);
        });
}

function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)

    // test om te zien of het werkt
    let passenger = { Pregnant: 1 , Glucose: 22, pedigree: 0.2, Age: 22 }
    let prediction = decisionTree.predict(passenger)
    console.log("predicted " + prediction)
}

loadSavedModel();