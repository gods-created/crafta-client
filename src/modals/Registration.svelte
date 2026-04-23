<script>
    import { registration, user_info } from '../../store.js';
    import { update_user_info } from '../../mixins/api.js';
    import { edit_alert_state } from '../../mixins/alert.js';
    import Cookies from 'js-cookie';

    let { user } = $props();

    let fullname = '';
    let email = '';

    const update_user_info_process = async (fullname, email) => {
      try {
        let cookies_token = Cookies.get('token');

        const { err_description, user, token } = await update_user_info(cookies_token, { fullname, email });
        if (err_description) {
          edit_alert_state(true, 'danger', err_description);
          return;
        }

        Cookies.set('token', token, { expires: 1 });
        user_info.set(user);

      } finally {
        registration.set(false);
      }
    }

</script>

<div class="modal d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Registration</h5>
      </div>
      <div class="modal-body">
        <p class="fw-bold">Add information about yourself:</p>
        <form>
            <div class="mb-3">
                <label for="fullname">Fullname:</label>
                <input type="text" class="form-control" name="fullname" id="fullname" bind:value={ fullname }>
            </div>

            <div class="mb-3">
                <label for="email">Email:</label>
                <input type="email" class="form-control" name="email" id="email" bind:value={ email }>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" on:click={ async () => await update_user_info_process(fullname, email) }>Save</button>
      </div>
    </div>
  </div>
</div>