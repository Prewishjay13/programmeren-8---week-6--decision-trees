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
        let patient = { glucose: glucose.value, pedigree: pedigree.value, age: age.value };
        loadSavedModel(patient);
      }
    });
  }
  
  addEventListenerToSubmitButton();
  
  function loadSavedModel(patient) {
    fetch("model/model.json")
      .then((response) => response.json())
      .then((model) => {
        modelLoaded(model, patient);
        console.log(model);
      });
  }
  
  function modelLoaded(model, patient) {
    let decisionTree = new DecisionTree(model);
    let prediction = decisionTree.predict(patient);
    console.log("predicted: " + prediction);
  
    let userInput = document.getElementById("userInput");
    if (userInput !== null && prediction !== undefined) {
        userInput.innerText = `Your personal prediction was: ${patient}, And the computer prediction is: ${prediction}`;
      }
      
    let visual = new VegaTree("#view", 900, 500, decisionTree.toJSON());
  }
    loadSavedModel({ glucose: 0, pedigree: 0, age: 0 });