<script>
  import Nav from "../components/Nav.svelte";

  //   export let segment;
</script>

<style>
  main {
    position: relative;
    background-color: white;
    /* padding: 2em; */
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

<Nav />

<main>
  <slot />
</main>
