import { LiteGraph } from "litegraph.js";

/**
 * Node to add an object to an array and output the result.
 */
function ConcatArrayAndObject() {
  this.addInput("Array", "array"); // Input: array
  this.addInput("Object", "object"); // Input: object to add to the array
  this.addOutput("Updated Array", "array"); // Output: updated array with the object added
}

ConcatArrayAndObject.title = "Concat Array and Object";

ConcatArrayAndObject.prototype.onExecute = function () {
  // Get the array and object from the inputs
  const array = this.getInputData(0) || []; // Default to empty array if input is not provided
  const object = this.getInputData(1); // Get the object to add

  if (!Array.isArray(array)) {
    console.warn("First input is not an array.");
    this.setOutputData(0, array); // Output the original input if it's not an array
    return;
  }

  // Add the object to the array if it exists
  const updatedArray = object !== undefined ? [...array, object] : array;

  // Set the updated array as output
  this.setOutputData(0, updatedArray);
};

LiteGraph.registerNodeType("array/ConcatArrayAndObject", ConcatArrayAndObject);
