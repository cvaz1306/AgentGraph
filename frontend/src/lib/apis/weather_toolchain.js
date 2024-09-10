import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import { LiteGraph } from "litegraph.js";
import { z } from "zod";

const weatherTool = tool((_) => "Da weather is weatherin", {
  name: "get_current_weather",
  description: "Get the current weather in a given location",
  schema: z.object({
    location: z.string().describe("The city and state, e.g. San Francisco, CA"),
  }),
});
export function WeatherToolchain(){
    this.addInput("Run", LiteGraph.ACTION)
    this.addOutput("Toolchain", "array");
}
WeatherToolchain.title = "Weather Toolchain";
WeatherToolchain.prototype.onAction = function(){
    this.setOutputData(0,[weatherTool]);
}

LiteGraph.registerNodeType("tool/weatherToolChain",WeatherToolchain);