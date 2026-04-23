<script>
    import Icon from './Icon.svelte';
    
    // Принимаем пропсы. В Svelte 5 bind:trimmedRows требует, чтобы мы обновляли объект
    let { rows = [], perPage = 3, trimmedRows = $bindable() } = $props();

    let currentPage = $state(0);
    
    // Вычисляемые значения (только для чтения)
    let totalRows = $derived(rows.length);
    let totalPages = $derived(Math.ceil(totalRows / perPage));
    let start = $derived(currentPage * perPage);
    let end = $derived(Math.min(start + perPage, totalRows));

    // Синхронизируем выходной массив при изменении страницы или входных данных
    $effect(() => {
        trimmedRows = rows.slice(start, end);
    });

    // Сброс страницы, если массив данных изменился (например, при поиске)
    $effect(() => {
        if (rows) currentPage = 0;
    });
</script>

{#if totalRows > perPage}
    <div class='pagination'>
        <button 
            class="btn"
            onclick={() => currentPage -= 1} 
            disabled={currentPage === 0} 
            aria-label="Previous page"
        >
            <Icon name='arrow' direction="s" />
        </button>
        
        <p class="m-0 p-0">{start + 1} - {end} of {totalRows}</p>
        
        <button 
            class="btn"
            onclick={() => currentPage += 1} 
            disabled={currentPage >= totalPages - 1} 
            aria-label="Next page"
        >
            <Icon name='arrow' direction='n' />
        </button>
    </div>
{/if}

<style>
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-top: 2rem;
    }

    button {
        display: flex;
        padding: 0.5rem;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>