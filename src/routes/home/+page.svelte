<script>
    import { games_list, show_game, game_icon } from '../../../mixins/api.js';
    import { edit_alert_state } from '../../../mixins/alert.js';
    import { top_games } from '../../../store.js';
    import { onMount } from 'svelte';
    import { game_description_block_state } from '../../../mixins/additions.js';
    import Pagination from '../../layouts/Pagination.svelte';
    import Spinner from '../../layouts/Spinner.svelte';

    let spinner = $state(true);
    let trimmedRows = $state([]);

    const games_list_process = async () => {
        const now = Date.now();

        if ($top_games) {
            if (now - $top_games['updated_at'] > 30000) {
                top_games.set(null);
            }
        }

        if (!$top_games) {
            const { err_description, games } = await games_list(10, 'likes');
            if (err_description) {
                edit_alert_state(true, 'danger', err_description);
                return;
            }

            top_games.set({ games, updated_at: now});
        }
    }

    onMount(async () => {
        await games_list_process();

        setTimeout(() => {
            spinner = false;
        }, 1000)
    })
</script>

<svelte:head>
    <title>Crafta: Home</title>
</svelte:head>

{#if !$top_games || $top_games.games.length == 0}
<span class="fs-4 fw-bold">
    No one game didn't find
</span>
{:else}
    {#if spinner}
        <Spinner />
    {:else}
        <span class="fs-4 fw-bold">
            Top games:
        </span>
        <div class="row row-cols-1 mt-4 row-cols-sm-3 row-cols-md-4 g-3">
            {#each trimmedRows as game}
                <div class="col">
                    <div class="card shadow-sm">
                        <img src={game_icon(game.id)} alt="Icon" class="img-fluid" />
                        <div class="card-body"> 
                            <p class="card-text d-none description-block-{game.id}">{ game.short_description }</p> 
                            <div class="d-flex flex-column justify-content-between align-items-start"> 
                                <div class="btn-group"> 
                                    <button type="button" class="btn btn-sm btn-outline-secondary" 
                                        on:click={ (e) => { game_description_block_state(game.id, e.currentTarget) } }
                                    >More</button> 
                                    <button type="button" class="btn btn-sm btn-outline-secondary" 
                                        on:click={ () => { show_game(game.id) } }
                                    >Play</button> 
                                </div> 
                                <small class="text-body-secondary my-2">Likes: <span class="text-decoration-underline">{ game.likes }</span></small>
                            </div> 
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <Pagination rows={$top_games.games} perPage={4} bind:trimmedRows={trimmedRows} />
    {/if}
{/if}