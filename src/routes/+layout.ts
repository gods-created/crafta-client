import { redirect } from '@sveltejs/kit';
import { user_info } from '../../store.js';
import { check_token } from '../../mixins/api.js';
import Cookies from 'js-cookie';
export const ssr = false;

export async function load({ url }) {
    const pathname = url.pathname;
    const allowed_routes = ['/home', '/about', '/faq', '/dashboard', '/my_games', '/logout'];
    const token = Cookies.get('token');
    const users_tab = pathname.includes('/dashboard') || pathname.includes('/my_games');
    
    if (!allowed_routes.includes(pathname)) {
        throw redirect(302, '/home');
    }

    if (token) {
        const { err_description, user } = await check_token(token);
        if (err_description) {
            console.log(err_description);
            
            Cookies.remove('token');
            if (users_tab) {
                throw redirect(302, '/home');
            }
        } else {
            user_info.set(user);
        }
    }

    if (!token && users_tab) {
        throw redirect(302, '/home');
    }
}