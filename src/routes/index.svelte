<script>
	import "carbon-components-svelte/css/g80.css";
	import { ProgressBar, Modal, Button } from 'carbon-components-svelte';
	import { files, output, modalOpen, progress, webOutput } from '$lib/app';
	import ButtonsWeb from '$lib/components/ButtonsWeb.svelte';
	import Files from '$lib/components/Files.svelte';

	let link;
	async function download() {
		link.href = URL.createObjectURL($webOutput);
		link.download = 'merged.pdf' 
		link.dispatchEvent(
			new MouseEvent('click', { 
				bubbles: true, 
				cancelable: true, 
				view: window 
			})
		);
	}
</script>

<div class="container">
	<div class="main">
		<Files />
		<div class="output">{$output}</div>
		<ButtonsWeb />
	</div>

	<ProgressBar 
	bind:max={$files.size}
	value={$progress}
	/>
</div>

<Modal passiveModal bind:open={$modalOpen} modalHeading="Merge Complete" on:open on:close>
	<Button 
    size="small"
    on:click={download}
    >Download PDF</Button>
</Modal>

<a class="hidden-link" download="merged.pdf" bind:this={link}>Download merged PDF</a>

<style>
	.hidden-link {
		display: none
	}
	.container {
		display:flex;
		flex-direction: column;
		gap: 2em;
		max-width: 500px;
		max-width: 600px;
		margin: 0 auto;
		margin-top: 1em;
	}
	.main {
		display: flex;
		flex-direction: column;
		place-items: center;
	}
	.output {
		margin-bottom: 1em;
		text-align: left;
		width: 100%;
		height: 0.5em;
	}
</style>

