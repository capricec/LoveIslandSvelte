<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import BuildingChart from "$components/story/BuildingChart.svelte";
	import BuildingSmallMultipleArcs from "$components/story/BuildingSmallMultipleArcs.svelte";
	import SeasonSelect from "$components/story/SeasonSelect.svelte";
	import copy from "$data/copy.json"
	import SeasonsData from "$data/SeasonsData.csv";
	import { scrollState } from "$stores/misc";
	import { LayerCake, Svg } from "layercake";

	console.log(SeasonsData);
	
</script>

<section id="scrolly">
	<p>{copy.Intro}</p>
	<p>{copy.Intro2}</p>
	<p>{copy.Intro3}</p>
	<div class = "stickyChart">
		<SeasonSelect/>
		<BuildingChart/>
	</div>
	<Scrolly bind:value={$scrollState}>
		{#each ['TA1a', 'TA1b', 'TA2a', 'TA2b', 'TA3a', 'TA3b','TA4a', 'TA4b', 'TA5a', 'TA5b', 'TA6a'] as text, i}
			{@const active = $scrollState === i}
			<div class="step scrollyLeft" class:active>
				<p>{copy[text].plain} <span class="tagline"> {copy[text].tagline} </span> {copy[text].plain2}</p>
			</div>
		{/each}
	</Scrolly>

	<div class="spacer" />
	<p>{copy.Outro1}</p>
	<p>{copy.Outro2}</p>
	<div class = "multipleBox">
		{#each SeasonsData as season}
		<div class = "seasonSmallMultiple">
		<p class = "seasonHeader">{season.Season_Name}</p>
			<figure>
				<LayerCake >
					<Svg>
						<BuildingSmallMultipleArcs value={season}/>
					</Svg>
				</LayerCake>
			</figure>
		</div>
		{/each}
<style>
	
</style>
</section>

<style>

	figure {
		width: 200px;
		height: 160px;
		
	}

	.seasonHeader{
		font-size: 12px;
		text-align: center;

	}

	.seasonSmallMultiple{
		display: inline-block;
		margin-bottom: 80px;
	}




	.stickyChart {
		position: sticky;
		z-index: 0;
		top: 0em;
	}

	.tagline{
		background-color: purple;
		color: white;
		padding-left: 0px;
	}


	.spacer {
		height: 80vh;
	}

	.step {
		height: 80vh;
		background: none;
		text-align: center;
	}

	.scrollyLeft{
		height: auto;
		margin-bottom: 80vh;
		position: relative;
		width: 60%;
		right: 0;
		background: white;
		padding: 20px;
		z-index: 10;
		box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
	}


	.step p {
		padding: 1rem;
	}

	@media (max-width: 600px) {
	  .scrollyLeft{
		height: auto;
		margin-bottom: 80vh;
		width: auto;
		background: white;
		padding: 20px;
		box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
	}
	}

</style>
