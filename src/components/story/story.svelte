<script>
	
	import StoryScrolly from "$components/story/Story.Scrolly.svelte";
</script>

<div id="Intro">
	<h1><span class = "boldheader">love</span>island </h1>
	<h1>by the numbers </h1>
	<p class = "subtitle">A data driven look at why we choose the couples that win Love Island</p>
</div>
<div id = "Content">
	<StoryScrolly />
</div>

<style>

	h1{
		text-align:center;
		margin-top: -30px;
	}

	.subtitle{
		text-align:center;
	}

	.boldheader{
		font-weight: 600;
	}



	#Content, #Intro {
		font-family: "Tiempos Text Web";
		max-width: 40rem;
		padding: 16px;
		margin: auto;
	}

	#Intro{
		margin-top: 100px;
	}

	:global(#Content section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#Content h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}
</style>
