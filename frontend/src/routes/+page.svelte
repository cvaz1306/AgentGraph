
<script>
	import { onMount } from 'svelte';
	import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js';
	import { GenerateWithOllama } from '$lib/apis/ollama';
	import { DynamicToolGenerator } from '$lib/apis/dynamic_tools';
    import {} from '$lib/apis/dynamic_schema';
	import {  } from '$lib/apis/schema_to_string';
	onMount(() => {
		// Create the graph and canvas when the component is mounted
		const graph = new LGraph();

		const canvas = new LGraphCanvas('#mycanvas', graph);

		canvas.allow_searchbox = true;

		// Start the graph
		graph.start();
	});
</script>

<canvas id="mycanvas" width="1024" height="720"></canvas>

<style>
	canvas {
		border: 1px solid #333;
		background-color: #2e2e2e;
		display: block;
		margin: 0 auto;
	}
</style>
