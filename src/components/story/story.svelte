<script>
	
	import StoryScrolly from "$components/story/Story.Scrolly.svelte";
</script>

<div id="Intro">
	<h1>What Can Love Island Tell Us About Love</h1>
	<h6>A data driven look at why we choose the couples that win Love Island</h6>
</div>
<div id = "Content">
	<StoryScrolly />
</div>

<style>

	h1, h6{
		text-align:center;
	}

	#Content, #Intro {
		font-family: "Tiempos Text Web";
		max-width: 40rem;
		padding: 16px;
		margin: auto;
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
