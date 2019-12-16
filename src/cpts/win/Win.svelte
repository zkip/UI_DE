<script>
  import Icon from "@/cpts/Icon";
  import { onMount, createEventDispatcher } from "svelte";
  export let x = 0;
  export let y = 0;
  export let width = 100;
  export let height = 100;
  export let isFully = false;
  let header_D;

  const dispatch = createEventDispatcher();

  onMount(() => {
    header_D.addEventListener(
      "mousedown",
      ({ clientX: ix, clientY: iy, which }) => {
        if (which !== 1) return;
        let ipx = x,
          ipy = y;
        const fn = {
          move({ clientX: nx, clientY: ny }) {
            x = ipx + (nx - ix);
            y = ipy + (ny - iy);
            dispatch("move", { x, y });
          },
          up() {
            cl(removeEventListener);
          }
        };
        let cl = wrap => {
          Object.entries(fn).map(([name, fn]) => {
            wrap("mouse" + name, fn);
          });
        };
        cl(addEventListener);
      }
    );
  });
</script>

<style src="./Window.scss">

</style>

<div class="Window" style="left: {x}px; top: {y}px;">
  <header bind:this={header_D}>
    <div class="operations">
      <div class="space" />
      <div class="minium">
        <Icon tag="minus-sign" />
      </div>
      <div class="maxium_restore">
        {#if isFully}
          <Icon tag="minimize" />
        {:else}
          <Icon tag="expand" />
        {/if}
      </div>
      <div class="close">
        <Icon tag="close" />
      </div>
      <div class="sticky">
        <Icon tag="circle-outline" />
      </div>
    </div>
  </header>

  <div class="content">
    <slot />
  </div>
</div>
