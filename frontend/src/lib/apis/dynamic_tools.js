import { tool } from "@langchain/core/tools";
import { LiteGraph } from "litegraph.js";

/**
 * Node to dynamically create tools with a given name, description, and schema.
 */
export function DynamicToolGenerator() {
  this.addInput("Schema", "object"); // Schema input from the Dynamic Schema Generator node
  this.addInput("Tool Name", "string");
  this.addInput("Description", "string");
  this.addInput("Action Function", "function");
  this.addInput("Generate Tool", LiteGraph.ACTION);
  this.addOutput("Tool", "object"); // Output for the dynamically created tool

  this.tool = null;
}

DynamicToolGenerator.title = "Dynamic Tool Generator";

DynamicToolGenerator.prototype.onAction = function () {
  const schema = this.getInputData(0);
  const toolName = this.getInputData(1);
  const description = this.getInputData(2);
  //const actionFunction = this.getInputData(3);

  if (!schema || !toolName || !description){//} || !actionFunction) {
    console.warn("Missing inputs for tool generation.");
    return;
  }

  try {
    // Create the tool using the provided schema, name, description, and action function
    this.tool = tool((_)=>{}, {
      name: toolName,
      description: description,
      schema: schema,
    });

    // Set the tool as output
    this.setOutputData(0, this.tool);
    console.log("Tool generated:", this.tool);
  } catch (error) {
    console.error("Error generating tool:", error);
  }
};

LiteGraph.registerNodeType("tool/DynamicToolGenerator", DynamicToolGenerator);
