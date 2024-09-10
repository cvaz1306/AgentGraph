import { ChatOllama } from '@langchain/ollama';
import { LiteGraph } from 'litegraph.js';

// Define the Ollama chat model instance
const llm = new ChatOllama({
  model: "llama3", // Default model
  temperature: 0,
  maxRetries: 2,
  keepAlive: -1,
});

/**
 * @param {import("@langchain/core/language_models/base").BaseLanguageModelInput} prompt
 */
export function GenerateWithOllama() {
  this.addInput("Prompt", "string"); // Input for the prompt text
  this.addInput("Generate", LiteGraph.ACTION); // Action input to trigger generation
  this.addInput("Available Tools", "array"); // Input for available tools (array of tools)
  this.addOutput("Result", "string"); // Output for generated text
  this.addOutput("Tool Calls", "array"); // Output for tool call logs
}

GenerateWithOllama.title = "Generate With Ollama";
GenerateWithOllama.prototype.onAction = async function () {
  console.log("Generating");
  let output = "";
  let toolCalls = [];

  // Get the prompt and available tools
  const prompt = this.getInputData(0);
  const availableTools = this.getInputData(2); // Available tools from the second input

  if (!prompt) {
    console.warn("No prompt provided.");
    return;
  }

  try {
    // Set up the tool usage with the available tools
    const llmWithTools = availableTools ? llm.bindTools(availableTools) : llm;

    // Stream the response from the model
    for await (const chunk of await llmWithTools.stream(prompt)) {
      output += chunk.content;
      this.setOutputData(0, output); // Set the generated text output

      // Check if a tool call was made and log it
      if (chunk.toolCall) {
        toolCalls.push(chunk.toolCall);
        this.setOutputData(1, toolCalls); // Set the tool call logs output
      }

      console.log(chunk);
    }
  } catch (error) {
    console.error("Error during generation:", error);
  }
};

LiteGraph.registerNodeType("ai/ollama", GenerateWithOllama);
