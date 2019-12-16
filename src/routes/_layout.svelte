<script>
  import Nav from "@/cpts/Nav.svelte";

  //   export let segment;
</script>

<style>
  main {
    /* position: absolute; */
    top: 0;
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
