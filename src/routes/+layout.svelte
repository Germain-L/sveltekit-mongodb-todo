<script>
  import Navbar from "$lib/components/Navbar.svelte";

  import "../app.css";
</script>

<div class="mx-20 my-10 space-y-10">
  <Navbar />
  <slot />
</div>
