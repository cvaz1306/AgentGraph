import { LiteGraph } from "litegraph.js";

/**
 * Node to convert a zod schema to a string representation.
 */
export function SchemaToStringConverter() {
  this.addInput("Schema", "object"); // Input: zod schema object
  this.addOutput("Schema String", "string"); // Output: string representation of the schema
}

SchemaToStringConverter.title = "Schema to String Converter";

SchemaToStringConverter.prototype.onExecute = function () {
  const schema = this.getInputData(0); // Get the schema from the input

  if (!schema) {
    this.setOutputData(0, "No schema provided.");
    return;
  }

  try {
    // Convert the schema to a string
    const schemaString = JSON.stringify(schema._def, null, 2); // Convert the schema definition to a readable string
    this.setOutputData(0, schemaString); // Output the string representation
  } catch (error) {
    console.error("Error converting schema to string:", error);
    this.setOutputData(0, "Error converting schema.");
  }
};

LiteGraph.registerNodeType("schema/SchemaToStringConverter", SchemaToStringConverter);
