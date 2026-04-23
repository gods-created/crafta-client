import { get } from 'svelte/store';
import { api_url } from '../store';

export const auth = async (phonenumber, code=null) => {
    let response = {};

    try {
        const request = await fetch(
            `${get(api_url)}user/auth`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ phonenumber, code })
            }
        )

        response = await request.json();

        if (!request.ok) {
            throw Error(response.err_description)
        }

    } catch(error) {
        response['err_description'] = error instanceof TypeError || !error.message ?
            'Server doesn\'t work. Try it again later' :
            error.message
    }

    return response
}

export const check_token = async (token) => {
    let response = {};

    try {
        const request = await fetch(
            `${get(api_url)}user/check_token/${token}`, {
                method: 'get',
                headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max_age=86400'}
            }
        )

        response = await request.json();

        if (!request.ok) {
            throw Error(response.err_description);
        }

    } catch (error) {
        response['err_description'] = error instanceof TypeError || !error.message ?
            'Server doesn\'t work. Try it again later' :
            error.message
    }

    return response
}

export const games_list = async (items, order_by) => {
    let response = {} 

    try {
        const request = await fetch(
            `${get(api_url)}game/filter?items=${items}&order_by=${order_by}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max_age=86400'},
            }
        )

        response = request.json();

        if (!request.ok) {
            throw Error(response.err_description)
        }
        
    } catch(error) {
        response['err_description'] = error instanceof TypeError || !error.message ?
            'Server doesn\'t work. Try it again later' :
            error.message
    }

    return response;
}

export const show_game = (id) => {
    open(`${get(api_url)}game/show/${id}`, '_blank');
}

export const game_icon = (id) => {
    return `${get(api_url)}game/icon/${id}`;
}

export const update_user_info = async (token, data) => {
    let response = {};

    try {
        const request = await fetch(
            `${get(api_url)}user/update/${token}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
        )

        response = await request.json();

        if (!request.ok) {
            throw Error(response.err_description)
        }

    } catch(error) {
        response['err_description'] = error instanceof TypeError || !error.message ?
            'Server doesn\'t work. Try it again later' :
            error.message
    }

    return response
}

export const create_game = async (short_description, description, user_id, token) => {
    let response = {};

    try {
        const request = await fetch(
            `${get(api_url)}game/create`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ short_description, description, user_id })
            }
        )

        response = await request.json();

        if (!request.ok) {
            throw Error(response.err_description)
        }

    } catch(error) {
        response['err_description'] = error instanceof TypeError || !error.message ?
            'Server doesn\'t work. Try it again later' :
            error.message
    }

    return response
}

export const delete_game = async (id, token) => {
    let response = {};

    try {
        const request = await fetch(
            `${get(api_url)}game/delete/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            }
        )

        response = await request.json();

        if (!request.ok) {
            throw Error(response.err_description)
        }

    } catch(error) {
        response['err_description'] = error instanceof TypeError || !error.message ?
            'Server doesn\'t work. Try it again later' :
            error.message
    }

    return response
}