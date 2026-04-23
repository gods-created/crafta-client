import { writable, readable } from 'svelte/store';
import { PUBLIC_API_URL } from '$env/static/public';

export const api_url = readable(PUBLIC_API_URL)

export const auth_form_state = writable(false);
export const create_game_form_state = writable(false);
export const registration = writable(false);

export const alert_state = writable(false);
export const alert_type = writable('danger');
export const alert_msg = writable('Somethon went wrong. Try it again');

export const user_info = writable(null);

export const top_games = writable([]);