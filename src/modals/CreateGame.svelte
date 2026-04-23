<script>
    import { edit_alert_state } from '../../mixins/alert.js';
    import { create_game } from '../../mixins/api.js';
    import { user_info, create_game_form_state } from '../../store.js';
    import Cookies from 'js-cookie';
    import Spinner from '../layouts/Spinner.svelte';

    let short_description = '';
    let description = '';
    let user_id = $user_info.id;
    let token = Cookies.get('token');
    let loading = $state(false);

    const create_game_process = async (short_description, description, user_id, token) => {
      loading = true;

      try {
        const { err_description, message } = await create_game(short_description, description, user_id, token);
        if (err_description) {
          edit_alert_state(true, 'danger', err_description);
        }

        if (message) {
            edit_alert_state(true, 'success', message);
            create_game_form_state.set(false)
        }

      } finally {
        loading = false;
      }
    }

</script>

<div class="modal d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Create game</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            on:click={ () => create_game_form_state.set(false) }
        ></button>
      </div>
      <div class="modal-body">
        <form>
            <div class="my-2">
                <label for="short_description">Short description:</label>
                <textarea class="form-control" rows="4" name="short_description" id="short_description" bind:value={short_description}></textarea>
            </div>

            <div class="my-2">
                <label for="description">Description:</label>
                <textarea class="form-control" rows="8" name="description" id="description" bind:value={description}></textarea>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" disabled={loading} on:click={ async () => await create_game_process(short_description, description, user_id, token) }>
            {#if !loading}
                <span>Submit</span>
            {:else}
                <Spinner />
            {/if}
        </button>
      </div>
    </div>
  </div>
</div>