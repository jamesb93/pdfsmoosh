<script>
	import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
    import { processing, files } from '$lib/app';
    import { InlineLoading, Button } from 'carbon-components-svelte';
</script>

<div class="input-files">
    <div class="header">
        <div>PDFs</div>
        <div>
            {#if $processing}
            <InlineLoading />
            {/if}
        </div>
    </div>
    {#each Array.from($files) as f}
    <div class="file">
        <div class="title">{f.name}</div>
        <Button 
        size="small"
        kind="danger-tertiary" 
        iconDescription="Delete" 
        icon={TrashCan} 
        on:click={() => {
            $files.delete(f);
            $files = $files;
        }}
        />
    </div>
    {/each}
</div>

<style>
	.input-files {
		display: flex;
		flex-direction: column;
		height: 30em;
        overflow-y: auto;
        overflow-x: hidden;
		width: 100%;
		margin-bottom: 1em;
		border-bottom: 1px solid rgba(134, 134, 134, 0.578);
	}
	.header {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-between;
		margin-bottom: 0.5em;
		padding-bottom: 0.5em;
		height: 32px;
		border-bottom: 1px solid rgba(134, 134, 134, 0.578);
	}
	.file {
		display:flex;
		flex-direction: row;
        width: 100%;
        justify-content: space-between;
	}
	.title {
		border-bottom: 1px solid rgba(134, 134, 134, 0.578);
		display:flex;
		justify-content: left;
		align-items: center;
		overflow-x: none;
        width: 100%;
	}
</style>