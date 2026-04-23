<script>
    import { alert_type, alert_msg } from '../../store.js';
</script>

<div 
    class="position-fixed m-2 opacity-100 alert rounded-0 z-3 alert-{$alert_type}"
    role="alert"
    
>
  {$alert_msg}
</div>

<style>
    .alert {
        z-index: 1056 !important;
    }
</style>