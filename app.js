import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//data inladen
const csvFile = "data/diabetes.csv";
//waarop getraind wordt 
const trainingLabel = "Label";  
//ignored comlumns
const ignored = ["pregnant", "insulin", "bp", "skin", "bmi"]  
let amountCorrect = 0;
let totalAmount = 0;
let decisionTree;
//
// laad csv data als json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => {console.log(results.data) 
            trainModel(results.data) }
            // gebruik deze data om te trainen
  // gebruik deze data om te trainen
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    //data rond shuffelen
    data.sort(() => (Math.random() - 0.5));
    //splits data in traindata en testdata
    let trainingData = data.slice(0, Math.floor(data.length * 0.8));
    let testingData = data.slice(Math.floor(data.length * 0.8) + 1);

    console.log("train data: "+ trainingData);
    console.log("test data: "+ testingData);

    // maak het algoritme aan
    decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainingData,
        categoryAttr: trainingLabel
    })

      // Model opslaan als JSON
  let json = decisionTree.stringify();
  console.log(json);

    //save model
    // Convert the decision tree object to JSON string
// let json = JSON.stringify(decisionTree.toJSON(), null, 4);
// // Create a Blob object with the JSON string
// let blob = new Blob([json], {type: "application/json"});

// // Create a download link for the Blob object
// let url = URL.createObjectURL(blob);
// let link = document.createElement("a");
// link.download = "model.json";
// link.href = url;

// // Trigger the download
// document.body.appendChild(link);
// link.click();
// document.body.removeChild(link);


    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())


    // todo : maak een prediction met een sample uit de testdata
    predictAll(testingData)

    // todo : bereken de accuracy met behulp van alle test data
    calculateAccuracy()


}
function predictAll(testingData){
    amountCorrect = 0
    totalAmount = testingData.length

    let actualDiabetes = 0
    let actualNoDiabetes = 0
    let predictedWrongDiabetes = 0
    let predictedWrongNoDiabetes = 0


    for (const testPerson of testingData) {
        let testDataNoLabel = Object.assign({}, testPerson)
        delete testDataNoLabel.Label
        console.log(testDataNoLabel)

        let prediction = decisionTree.predict(testDataNoLabel)
        console.log(prediction)

        if(prediction == testPerson.Label) {
            amountCorrect++

            if(prediction == 0){
                actualNoDiabetes++
            }

            if(prediction == 1){
                actualDiabetes++
            }

        }

        if(prediction == 0 && testPerson.Label == 1){
            console.log("predicted havind diabetes right")
            predictedWrongNoDiabetes++
        }

        if(prediction == 1 && testPerson.Label == 0){
            console.log("predicted diabetes but was wrong")
            predictedWrongDiabetes++
        }

    }
    showMatrix(actualDiabetes,actualNoDiabetes,predictedWrongDiabetes,predictedWrongNoDiabetes)
}



    // todo : bereken de accuracy met behulp van alle test data
    function calculateAccuracy(){

        let accuracy = (amountCorrect / totalAmount) * 100

        console.log("Accuracy:" + accuracy)

        let accDiv = document.getElementById("accuracy")
        accDiv.innerHTML = `Accuracy: ${accuracy}`
}

function showMatrix(actualDiabetes,actualNoDiabetes,predictedWrongDiabetes,predictedWrongNoDiabetes){
    document.getElementById("total").innerHTML = totalAmount +" tested in total."
    document.getElementById("total-correct").innerHTML = amountCorrect +" predicted correctly!"

    document.getElementById("actual-d").innerHTML = actualDiabetes
    document.getElementById("actual-no-d").innerHTML = actualNoDiabetes
    document.getElementById("predicted-wrong-no-d").innerHTML = predictedWrongDiabetes
    document.getElementById("predicted-wrong-d").innerHTML = predictedWrongNoDiabetes
}

loadData() 



