<script>
    import { user_info, registration, create_game_form_state } from '../../../store.js';
    import Registration from '../../modals/Registration.svelte';

    let user = $user_info;
    registration.set(!user.fullname && !user.email);
    
</script>

<svelte:head>
    <title>Crafta: Dashboard</title>
</svelte:head>

{#if $registration}
    <Registration { user } />
{:else}
    <div class="row justify-content-start">
            <div class="col-lg-8">
                <div class="contact-card bg-white rounded-4 shadow-sm overflow-hidden">
                    <div class="row g-0">
                        <div class="col-md-4 bg-primary bg-gradient d-flex align-items-center justify-content-center p-4">
                            <img src="/images/user_icon.png" width="100" class="rounded-circle shadow-sm" alt="Profile Image">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body p-4">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h3 class="card-title mb-0 text-primary fw-bold">{ user.fullname }</h3>
                                    <span class="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                                        { user.email }
                                    </span>
                                </div>
                                <p class="card-text text-muted mb-4">
                                    Creator of { user.games.length } game(s).
                                </p>
                                <div class="d-flex gap-3 mb-4">
                                    <button class="btn btn-primary px-4 rounded-pill" on:click={ () => create_game_form_state.set(true) }>
                                        Create game
                                    </button>
                                </div>
                                <div class="border-top pt-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex gap-3">
                                            <i class="fab fa-twitter fa-lg social-icon text-primary"></i>
                                            <i class="fab fa-linkedin fa-lg social-icon text-primary"></i>
                                            <i class="fab fa-dribbble fa-lg social-icon text-primary"></i>
                                        </div>
                                        <span class="text-muted small">
                                            <i class="fas fa-map-marker-alt me-2"></i>Sing up at { user.created_at }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
{/if}