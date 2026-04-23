<script>
    import { auth } from '../../mixins/api.js';
    import { edit_alert_state } from '../../mixins/alert.js';
    import { user_info } from '../../store.js';
    import { goto } from '$app/navigation';
    import Cookies from 'js-cookie';

    let { auth_form_state, Spinner } = $props();

    let phonenumber = '+380';
    let code = '';
    let loading = false;

    const auth_process = async (phonenumber, code=null) => {
        loading = true;

        try {
            const { err_description, message, user, token } = await auth(phonenumber, code);
            
            if (err_description) {
                edit_alert_state(true, 'danger', err_description);
                return;
            }

            if (message) {
                edit_alert_state(true, 'success', message);
                return;
            }

            user_info.set(user);
            Cookies.set('token', token, { expires: 1 });
            
            auth_form_state.set(false);
            return goto('/dashboard');
        } catch(error) {
            edit_alert_state(
                true,
                'danger',
                error.message ?? 'Somethon went wrong. Try it again'
            )
        } finally {
            loading = false;
        }
    }

</script>

<div class="modal d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">User Authentication</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            on:click={ () => auth_form_state.set(false) }
        ></button>
      </div>
      <div class="modal-body">
        <form>
            <div class="mb-3">
                <label for="phonenumber">Phone number:</label>
                <input type="text" class="form-control" name="phonenumber" id="phonenumber" bind:value={ phonenumber }>
                <div class="mt-2">
                    <button type="button" class="btn btn-outline-dark"
                        disabled={loading}
                        on:click={ async () => auth_process(phonenumber) }
                    >   
                        {#if !loading}
                            <span>Send code</span>
                        {:else}
                            <Spinner />
                        {/if}
                    </button>
                </div>
            </div>

            <div class="mb-3">
                <label for="code">Code:</label>
                <input type="text" class="form-control" name="code" id="code" bind:value={ code }>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary"
            disabled={loading}
            on:click={ async () => auth_process(phonenumber, code) }
        >
            {#if !loading}
                <span>Okey</span>
            {:else}
                <Spinner />
            {/if}
        </button>
      </div>
    </div>
  </div>
</div>