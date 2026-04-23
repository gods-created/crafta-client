<script>
    import { user_info, create_game_form_state } from '../../../store.js';
    import { game_description_block_state } from '../../../mixins/additions.js';
    import { show_game, game_icon, delete_game } from '../../../mixins/api.js';
    import { edit_alert_state } from '../../../mixins/alert.js';
    import Cookies from 'js-cookie';
    import Pagination from '../../layouts/Pagination.svelte';

    let trimmedRows = $state([]);
    let user = $user_info ?? {};
    let games = $state(user.games ?? []);

    const delete_game_process = async (id) => {
        let token = Cookies.get('token');
        let { err_description } = await delete_game(id, token);
        if (err_description) {
            edit_alert_state(true, 'danger', err_description);
            return;
        }
        
        trimmedRows = trimmedRows.filter((game) => {
            return game.id !== id;
        })

        if (trimmedRows.length == 0) {
            games = [];
        }

        return;
    }
</script>

<svelte:head>
    <title>Crafta: My games</title>
</svelte:head>

{#if games.length == 0}
<span class="fs-6 fw-bold">
    <div class="d-flex flex-column align-items-start">
        <span class="my-1">You haven't created a single game yet. Give it a try:</span>
        <button class="btn btn-primary px-4 my-1 rounded-pill" on:click={ () => {create_game_form_state.set(true)} }>
            create game
        </button>
    </div>
</span>
{:else}
    <span class="fs-4 fw-bold">
        My created games:
    </span>
    <div class="row row-cols-1 mt-4 row-cols-sm-3 row-cols-md-4 g-3">
        {#each trimmedRows as game}
            <div class="col">
                <button class="btn rounded-5 btn-danger mb-3" on:click={ async () => { await delete_game_process(game.id) }}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z" clip-rule="evenodd"/>
                    </svg>
                </button>
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
                                    on:click={ () => { show_game(game.id) }}
                                >Play</button> 
                            </div> 
                            <small class="text-body-secondary my-2">Likes: <span class="text-decoration-underline">{ game.likes }</span></small>
                        </div> 
                    </div>
                </div>
            </div>
        {/each}
    </div>
    
    <Pagination rows={games} perPage={4} bind:trimmedRows={trimmedRows} />
{/if}