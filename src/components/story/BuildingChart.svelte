<script>
	import { range } from "d3";
	import { LayerCake, Svg } from "layercake";
	import BeeswarmForce from "$components/charts/todo/BeeswarmForce.svelte";
	/*import BuildingNetwork from "$components/story/BuildingNetwork.svelte";*/
	import SinglesData from "$data/SinglesData.json";
	import CouplesData from "$data/CouplesData.json";
	
	const nodeData = SinglesData.filter(function(d){ return d.Season == "Love Island USA (Season 4)" });
	const linkData = CouplesData.filter(function(d){ return d.values[0].Season == "Love Island USA (Season 4)" });
	const xKey = 'Entered';
	const titleKey = 'Unique_Identifier';

	const nodesTransformed = nodeData.map(d => {
		return {
			id: d[titleKey],
			group: +d[xKey]
		};
	});
	
	const linksTransformed = linkData.map(d => {
		return {
			source: d.values[0]Participant1Identifier,
			target: d.values[0]Participant2Identifier,
			value: d.TotalTimesChosen
		};
	});
	
	console.log(linksTransformed, nodesTransformed);

</script>

<section>
	<h2>LayerCake Network</h2>
	<figure>
		<LayerCake 
			data={nodes:nodesTransformed, links: linksTransformed}
			height = 50vh>
			<Svg>
				<!--<BuildingNetwork />-->
			</Svg>
		</LayerCake>
	</figure>
</section>

<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 50vh;
	}
</style>
