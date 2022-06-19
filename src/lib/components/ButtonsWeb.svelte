<script>
    import { Button, FileUploaderButton } from 'carbon-components-svelte';
    import { 
        files,
        progress,
        webOutput,
        modalOpen,
        processing 
    } from '$lib/app';
	import { PDFDocument } from 'pdf-lib';
    
    $: mergeDisabled = $files.length === 0;
    let formFiles = [];

    async function addFiles() {
        for (let x of formFiles) {
            $files.add(x)
        }
        $files = $files;
    }
    
    async function executeMerge() {
        $progress = 0;
        $processing = true;
        const merged = await PDFDocument.create();
        for (let x of $files) {
            const doc = await PDFDocument.load(await x.arrayBuffer(), { ignoreEncryption: true });
            const pages = doc.getPageCount();
            for (var i=0; i<pages; i++) {
                const [page] = await merged.copyPages(doc, [i]);
                merged.addPage(page);
            }
            $progress += 1
        }
        const bytes = await merged.save();
        $webOutput = new Blob([bytes], {type: 'application/pdf'});
        $modalOpen = true;
        $processing = false;
        $progress = 0;
    }
</script>

<div class='buttons'>
    <FileUploaderButton
    multiple
    on:change={addFiles}
    labelText="Add Files"
    disableLabelChanges={true}
    kind="secondary"
    accept={[".pdf"]}
    status="complete"
    bind:files={formFiles}
    />

    <Button 
    size="small" 
    disabled={mergeDisabled} 
    on:click={executeMerge}>
    Merge PDFs
    </Button>

    <Button
    size="small"
    kind="danger"
    on:click={() => {
        $files = new Set([]);
        $progress = 0;
        $webOutput = '';
        $modalOpen = false;
        $processing = false;
        $progress = 0;
    }}
    >
        Reset
    </Button>
</div>

<style>
    .buttons {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: space-between;
        gap: 0.5em;
        width: 100%;
    }
</style>