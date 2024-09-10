
<script lang="ts">
	import { onMount } from 'svelte';
	import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js';
	import {  } from '$lib/apis/ollama';
	import {  } from '$lib/apis/dynamic_tools';
    import {  } from '$lib/apis/dynamic_schema';
	import {  } from '$lib/apis/schema_to_string';
    import {  } from '$lib/apis/concat_arrays';
    import {  } from '$lib/apis/weather_toolchain';
    import { uploadSerializedGraph } from '$lib/apis/upload_serialized';
	import { on } from 'svelte/events';
    import { assets } from '$app/paths'; // Import the assets path
    let graph:LGraph;
    let backgroundImageBase64 = '';
	onMount(() => {
		// Create the graph and canvas when the component is mounted
		graph = new LGraph();
        
		const canvas = new LGraphCanvas('#mycanvas', graph);
        
		canvas.allow_searchbox = true;
        graph.addInput("request", "string")
		// Start the graph
		graph.start();
        
	});
</script>

<canvas id="mycanvas" width="1024" height="720"></canvas>
<button on:click={() => uploadSerializedGraph(graph.serialize())}>Upload</button>
<button on:click={() => {graph.stop() ;graph.load("http://localhost:9394/download-serialized");graph.start()}}>Load</button>
<style>
	canvas {
		border: 1px solid #333;
		background-color: #2e2e2e;
		display: block;
		margin: 0 auto;
	}
</style>
