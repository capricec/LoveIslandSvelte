<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import BuildingChart from "$components/story/BuildingChart.svelte";
	import copy from "$data/copy.json"
	let value;
</script>

<section id="scrolly">
	<p>{copy.Intro}</p>
	<p>{copy.Intro2}</p>
	<div class = "stickyChart">
		<BuildingChart />
	</div>
	<Scrolly>
			<div class="step">
				<p>{copy.TA1a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step">
				<p>{copy.TA1b}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step">
				<p>{copy.TA2a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step">
				<p>{copy.TA2b}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step">
				<p>{copy.TA3a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step">
				<p>{copy.TA3b}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step">
				<p>{copy.TA4a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step">
				<p>{copy.TA4b}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step">
				<p>{copy.TA5a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step">
				<p>{copy.TA5b}</p>
			</div>
	</Scrolly>
	

	<div class="spacer" />
	<p>{copy.Outro1}</p>
	<p>{copy.Outro2}</p>
</section>

<!--<section id="scrolly">
	<h2>Scrolly <span>{value}</span></h2>
	<Scrolly bind:value>
		{#each [0, 1, 2, 3, 4] as text, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p> scrolly {text}</p>
			</div>
		{/each}
	</Scrolly>
	
</section>-->

<style>
	.stickyChart {
		position: sticky;
		z-index: -1;
		top: 2em;
	}

	.spacer {
		height: 80vh;
	}

	.step {
		height: 80vh;
		background: none;
		text-align: center;
	}

	.step p {
		padding: 1rem;
	}
</style>
