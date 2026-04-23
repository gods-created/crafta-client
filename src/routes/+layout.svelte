<script>
	import Auth from '../modals/Auth.svelte';
	import Alert from '../layouts/Alert.svelte';
	import CreateGame from '../modals/CreateGame.svelte';
	import Spinner from '../layouts/Spinner.svelte';
	import { page } from '$app/state';
	import { auth_form_state, alert_state, user_info, create_game_form_state } from '../../store.js';

	let { children } = $props();
</script>

<header>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
	<div class="container">
		<img src="/images/favicon.png" alt="Logo" class="img-fluid me-3 rounded-5" width="75">
		<a class="navbar-brand fw-bold" href="/home">Crafta</a>

		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav ms-auto gap-2">
				<li class="nav-item">
					<a class="nav-link" href="/home">
						<span class:fw-bold={ page.url.pathname.startsWith('/home') }>Home</span>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/about">
						<span class:fw-bold={ page.url.pathname.startsWith('/about') }>About</span>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/faq">
						<span class:fw-bold={ page.url.pathname.startsWith('/faq') }>FAQ</span>
					</a>
				</li>
			</ul>

			<div class="ms-lg-3 mt-3 mt-lg-0">
				{#if !$user_info}
					<a href="#" class="btn btn-outline-light btn-sm" 
						on:click={ () => auth_form_state.set(true) }
					>Sing In</a>
				{:else}
					<div class="btn-group">
						<button type="button" class="btn btn-light">
							<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
							</svg>
						</button>
						<button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
							<span class="visually-hidden">Toggle Dropdown</span>
						</button>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="/dashboard">Dashboard</a></li>
							<li><a class="dropdown-item" href="/my_games">My games</a></li>
							<li><a class="dropdown-item" href="/logout">Logout</a></li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
	</nav>
</header>

<main class="container py-5">
	{@render children()}
</main>

<footer class="footer my-3">
  <div class="container">
    <div class="row">

      <div class="col-md-4 mb-3">
        <h5 class="fw-bold">Crafta</h5>
        <p class="text-muted">Modern tool for creating your own browser games.</p>
      </div>

      <div class="col-md-4 mb-3">
        <h6>Navigation</h6>
        <ul class="list-unstyled">
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/faq">FAQ</a></li>
        </ul>
      </div>

      <div class="col-md-4 mb-3">
        <h6>Contacts</h6>
        <p class="mb-1">📍 Ukraine</p>
        <p class="mb-1">📧 tersk.bo@gmail.com</p>
        <p>📞 +380 68 673 63 64</p>
      </div>

    </div>

    <hr class="border-secondary">

    <div class="text-center text-muted">
      © 2026 Crafta
    </div>
  </div>
</footer>

{#if $auth_form_state}
  <Auth {auth_form_state} {Spinner} />
{/if}

{#if $alert_state}
	<Alert />
{/if}

{#if $create_game_form_state}
	<CreateGame />
{/if}