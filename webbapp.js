import { DecisionTree } from "./libraries/decisiontree.js";
import { VegaTree } from "./libraries/vegatree.js";

function addEventListenerToSubmitButton() {
    let glucose = document.getElementById("glucose");
    let pedigree = document.getElementById("pedigree");
    let age = document.getElementById("age");
    let submitBtn = document.getElementById("submit-button");
  
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!glucose.value || !pedigree.value || !age.value) {
        alert("Please fill out all fields");
      } else {
        loadSavedModel(glucose.value, pedigree.value, age.value);
      }
    });
  }
  
  addEventListenerToSubmitButton();
  
function loadSavedModel() {
    fetch("model/model.json")
        .then((response) => response.json())
        .then((model) => {
            modelLoaded(model);
            console.log(model);
        });
}

function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)

    // test om te zien of het werkt
    let patient = { glucose, pedigree, age }
    let prediction = decisionTree.predict(patient)
    console.log("predicted: " + prediction)

    if (value !== undefined) {
        userInput.innerText = `Your personal prediction was: ${value}, And the computer prediction is: ${prediction}`;
    }
    
      let visual = new VegaTree("#view", 900, 500, decisionTree.toJSON());
}

loadSavedModel();