<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import BuildingChart from "$components/story/BuildingChart.svelte";
	import copy from "$data/copy.json"
	
</script>

<section id="scrolly">
	<p>{copy.Intro}</p>
	<p>{copy.Intro2}</p>
	<div class = "stickyChart">
		<BuildingChart />
	</div>
	<Scrolly>
			<div class="step scrollyLeft">
				<p>{copy.TA1a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step scrollyLeft">
				<p>{copy.TA1b}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step scrollyLeft">
				<p>{copy.TA2a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step scrollyLeft">
				<p>{copy.TA2b}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step scrollyLeft">
				<p>{copy.TA3a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step scrollyLeft">
				<p>{copy.TA3b}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step scrollyLeft">
				<p>{copy.TA4a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step scrollyLeft">
				<p>{copy.TA4b}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step scrollyLeft">
				<p>{copy.TA5a}</p>
			</div>
	</Scrolly>
	<Scrolly>
			<div class="step scrollyLeft">
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

	.scrolly{
		background-image: url('//static/assets/beachbackground.jpg');
	}
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
</style>
