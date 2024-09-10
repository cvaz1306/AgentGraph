import { LiteGraph } from "litegraph.js";
import { z } from "zod";

/**
 * Node to dynamically create zod schemas.
 */
export function DynamicSchemaGenerator() {
  this.addInput("Add Field", LiteGraph.ACTION);
  this.addInput("Field Name", "string");
  this.addInput("Field Type", "string"); // e.g., "string", "number", "boolean"
  this.addOutput("Schema", "object");

  this.schemaDefinition = {};
}

DynamicSchemaGenerator.title = "Dynamic Schema Generator";

DynamicSchemaGenerator.prototype.onAction = function () {
  const fieldName = this.getInputData(1);
  const fieldType = this.getInputData(2);

  if (!fieldName || !fieldType) {
    console.warn("Field Name or Field Type is missing.");
    return;
  }

  // Dynamically add fields based on the input type
  switch (fieldType.toLowerCase()) {
    case "string":
      this.schemaDefinition[fieldName] = z.string().describe(`Field: ${fieldName}`);
      break;
    case "number":
      this.schemaDefinition[fieldName] = z.number().describe(`Field: ${fieldName}`);
      break;
    case "boolean":
      this.schemaDefinition[fieldName] = z.boolean().describe(`Field: ${fieldName}`);
      break;
    default:
      console.warn("Unsupported field type:", fieldType);
      break;
  }

  // Create and set the zod schema object
  this.setOutputData(0, z.object(this.schemaDefinition));
};
console.log("Registering dynamic schema generator");
LiteGraph.registerNodeType("schema/DynamicSchemaGenerator", DynamicSchemaGenerator);
