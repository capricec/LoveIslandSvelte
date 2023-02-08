<script>
	
	import StoryScrolly from "$components/story/Story.Scrolly.svelte";
</script>

<div id="Intro">
	<h1>Love Island Svelte</h1>
</div>
<div id = "Content">
	<StoryScrolly />
</div>

<style>
	#Content, #Intro {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
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
