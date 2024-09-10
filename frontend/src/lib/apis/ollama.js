import { ChatOllama } from '@langchain/ollama';
import { LiteGraph } from 'litegraph.js';

// Define the Ollama chat model instance

/**
 * @param {import("@langchain/core/language_models/base").BaseLanguageModelInput} prompt
 */
export function GenerateWithOllama() {
    this.addInput("Prompt", "string"); // Input for the prompt text
    this.addInput("Generate", LiteGraph.ACTION); // Action input to trigger generation
    this.addInput("Available Tools", "array"); // Input for available tools (array of tools)
    this.addInput("Model", "string"); // Input for the model name
    this.addOutput("Result", "string"); // Output for generated text
    this.addOutput("Tool Calls", "array"); // Output for tool call logs
    this.addOutput("Completed", LiteGraph.EVENT); // Event output for completion trigger
}

GenerateWithOllama.title = "Generate With Ollama";
GenerateWithOllama.prototype.onAction = async function () {
    const llm = new ChatOllama({
        model: this.getInputData(3), // Model from input
        temperature: 0,
        maxRetries: 2,
        keepAlive: -1,
    });
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
            if (chunk.tool_call_chunks) {
                toolCalls = toolCalls.concat(chunk.tool_call_chunks);
                this.setOutputData(1, toolCalls); // Set the tool call logs output
            }

            console.log(chunk);
        }

        // Trigger the completion event when generation is done
        this.triggerSlot(2); // Fire the 'Completed' event output
    } catch (error) {
        console.error("Error during generation:", error);
    }
};

LiteGraph.registerNodeType("ai/ollama", GenerateWithOllama);