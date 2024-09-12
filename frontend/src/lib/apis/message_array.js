import { LiteGraph } from "litegraph.js";

export function message(){
    this.addInput("content", "string");
    this.addInput("role", "string");
    this.addOutput("message", "object");
}
message.title = "Message";
message.prototype.onExecute = ()=>{
    this.setOutputData(1, [this.getInputData(1), this.getInputData(0)], true);
}
LiteGraph.registerNodeType("ai/message", message);
