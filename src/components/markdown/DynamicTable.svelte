<script lang="ts">
    import { onMount } from 'svelte';

    export let open             : boolean;
    export let onTableGenerated : ( tableString: string ) => void;


    let initialRows : number = 4;
    let initialCols : number = 4;
    let maxRows     : number = 10;
    let maxCols     : number = 10;
    let rows        : number = initialRows;
    let cols        : number = initialCols;
    let hoveredRow  : number = -1;
    let hoveredCol  : number = -1;
    let cells       : boolean[][] = Array( maxRows )
        .fill( false )
        .map(() => Array( maxCols ).fill( false ));


    const genetateArray = (
        spaces  : number,
        fill    : string,
        join    : string
    ): string => Array( spaces ).fill( fill ).join( join );


    function generateMarkdownTable(cell: { row: number, col: number }): string {
        const rows          = cell.row;
        const cols          = cell.col;
        const header        = genetateArray( cols, 'Header', ' | ' );
        const separator     = genetateArray( cols, '---', ' | ' );
        const rows_content  = Array( rows )
            .fill(0)
            .map(() => genetateArray( cols, 'Cell', ' | ' ))
            .join( '\n| ' );

        return `| ${header} |\n| ${separator} |\n| ${rows_content} |`;
    }


    function handleCellClick(row: number, col: number): void {
        const clickedCell       = { row, col: col + 1 };
        const generatedTable    = generateMarkdownTable( clickedCell );
        onTableGenerated( generatedTable );
        open = !open;
    }


    function handleMouseEnter( row: number, col: number ): void {
        hoveredRow = row;
        hoveredCol = col;

        cells = cells.map(( r, i ) =>
            r.map(( _, j ) => i <= hoveredRow && j <= hoveredCol )
        );

        if ( row >= rows - 1 && rows < maxRows ) rows++;
        if ( col >= cols - 1 && cols < maxCols ) cols++;

        rows = Math.min( rows, maxRows );
        cols = Math.min( cols, maxCols );
    }


    function handleMouseLeave(): void {
        hoveredRow = -1;
        hoveredCol = -1;
        rows = initialRows;
        cols = initialCols;

        cells = Array( maxRows )
            .fill( false )
            .map(() => Array( maxCols ).fill( false ));
    }

    $: {
        if ( hoveredRow >= 0 && hoveredCol >= 0 ) {
            rows = Math.max( initialRows, Math.min( hoveredRow + 2, maxRows ));
            cols = Math.max( initialCols, Math.min( hoveredCol + 2, maxCols ));
        }
    }

    onMount(() => {
        handleMouseLeave();
    });
</script>


<div class="flex">
    <div 
        class           = "grid gap-0.5"
        style           = "grid-template-columns: repeat({cols}, auto); grid-template-rows: repeat({rows}, auto);"
        on:mouseleave   = { handleMouseLeave }
        role            = "grid"
        tabindex        = "0"
    >
        {#each Array(rows) as _, i}
            {#each Array(cols) as _, j}
                <div
                    class="w-4 h-4 border border-zinc-300 dark:border-zinc-500 transition-colors duration-200 ease-in-out rounded cursor-pointer"
                    class:bg-sky-500={cells[i][j]}
                    on:mouseenter={() => handleMouseEnter(i, j)}
                    on:click={() => handleCellClick(i, j)}
                    on:keydown={(e) => e.key === 'Enter' && handleCellClick(i, j)}
                    role="grid"
                    tabindex="0"
                ></div>
            {/each}
        {/each}

    </div>
</div>

<span class="mx-auto flex justify-center mt-1 dark:text-zinc-100">
    {#if hoveredRow >= 0 && hoveredCol >= 0}
        {hoveredRow + 1} x {hoveredCol + 1}
    {:else}
        0 x 0
    {/if}
</span>
