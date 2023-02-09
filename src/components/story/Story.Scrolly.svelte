<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import BuildingChart from "$components/story/BuildingChart.svelte";
	import copy from "$data/copy.json"
	import { scrollState } from "$stores/misc";
	
</script>

<section id="scrolly">
	<p>{copy.Intro}</p>
	<p>{copy.Intro2}</p>
	<div class = "stickyChart">
		<BuildingChart/>
	</div>

	<Scrolly bind:value={$scrollState}>
		{#each ['TA1a', 'TA1b', 'TA2a', 'TA2b', 'TA3a', 'TA3b','TA4a', 'TA4b', 'TA5a', 'TA5b'] as text, i}
			{@const active = $scrollState === i}
			<div class="step scrollyLeft" class:active>
				<p>{copy[text]}</p>
			</div>
		{/each}
	</Scrolly>


	<div class="spacer" />
	<p>{copy.Outro1}</p>
	<p>{copy.Outro2}</p>
</section>

<style>


	.stickyChart {
		position: sticky;
		z-index: -1;
		top: 0em;
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
		width: 50%;
		right: 0;
		background: white;
		padding: 20px;
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
