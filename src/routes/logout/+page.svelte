<script>
    import { goto } from '$app/navigation';
    import { user_info } from '../../../store.js';
    import Cookies from 'js-cookie';

    Cookies.remove('token');
    user_info.set(null);
    setTimeout(() => {
        goto('/home');
    }, 0)
</script>