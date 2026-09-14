<script>
    let { data } = $props();
</script>

<h1>Meine PDFs</h1>

<h2>PDF hochladen</h2>

<form
    method="POST"
    enctype="multipart/form-data"
>
    <input
        type="file"
        name="pdf"
        accept="application/pdf"
        required
    />

    <button type="submit">
        Hochladen
    </button>
</form>

<h2>Meine Dateien</h2>

{#if data?.pdfs?.length > 0}

    {#each data.pdfs as pdf}

        <div>
            <span>{pdf.filename}</span>

            <a href={pdf.filepath} download>
                Download
            </a>
        </div>

    {/each}

{:else}

    <p>Noch keine PDFs vorhanden.</p>

{/if}