import { alert_state, alert_type, alert_msg } from '../store';

let alertTimeout;

export const edit_alert_state = (
    state = false,
    type = 'danger',
    msg = 'Something went wrong. Try it again'
) => {
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }

    alert_state.set(state);

    if (state) {
        alert_type.set(type);
        alert_msg.set(msg);

        alertTimeout = setTimeout(() => {
            alert_state.set(false);
        }, 3000);
    }
};