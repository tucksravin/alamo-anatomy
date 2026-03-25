<script lang="ts">
	import mark from '$lib/assets/images/logos/mark.svg';
  import ContentWidth from './ContentWidth.svelte';
  import DefaultButton from './DefaultButton.svelte';

	let menuOpen = $state(false);
</script>

<nav class="fixed top-0 left-0 w-full z-50 h-20">
<ContentWidth class="flex items-center h-full justify-between">
	<a href="/" class="hover:">
		<img src={mark} alt="AATI" class="w-10 h-10" />
	</a>

	<div class="h-full flex items-center relative gap-4">
		<DefaultButton href="/contact">Contact Us</DefaultButton>
		<button onclick={() => menuOpen = !menuOpen} class="text-light hover:text-white transition duration-400 text-2xl flex items-center justify-center" aria-label="Toggle menu">
			<i class="fa-solid fa-sharp fa-bars"></i>
		</button>
	</div>
</ContentWidth>
</nav>

{#if menuOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-40 bg-dark/90 flex flex-col items-center justify-center gap-8 text-white text-2xl"
		onclick={() => menuOpen = false}
		onkeydown={(e) => { if (e.key === 'Escape') menuOpen = false; }}
	>
		<button onclick={() => menuOpen = false} class="absolute top-4 right-8 text-3xl" aria-label="Close menu">
			<i class="fa-solid fa-xmark"></i>
		</button>
		<a href="/" class="hover:opacity-70 transition">Home</a>
		<a href="/about" class="hover:opacity-70 transition">About Us</a>
		<a href="/facility" class="hover:opacity-70 transition">Our Facility</a>
		<a href="/contact" class="hover:opacity-70 transition">Contact Us</a>
	</div>
{/if}
