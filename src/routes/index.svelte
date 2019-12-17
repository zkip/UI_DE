<script context="module">
  //   import { goto } from "@sapper/app";
  export async function preload(page, session) {}
</script>

<script>
  import Win from "@/cpts/win/Win";
  import * as sapper from "@sapper/app";
  import { side } from "@/store";
  import { onMount } from "svelte";
  import { readable, writable } from "svelte/store";
  import { Source } from "@/swwrap";
  let store = sapper.stores();
  let { page } = store;
  Source();

  onMount(() => {});

  function newWin({ clientX, clientY }) {
    let id = create({ x: clientX, y: clientY });
  }
</script>

<style>
  .root {
    flex: 1;
    top: 0;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    place-items: stretch;
  }
  .root > * {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .toolbox {
    pointer-events: none;
    z-index: 3;
  }
  .toolbox > * {
    pointer-events: all;
  }
  .toolbox .info {
    pointer-events: none;
  }
</style>

<div class="root">
  <div class="toolbox">
    <div class="window panel">
      <button on:click={newWin}>create</button>
    </div>
    <div class="info">
      <!-- {#each Object.entries($pool) as [id, win]}
        <span>{win.x},{win.y}</span>
      {/each} -->
    </div>
  </div>
  <div class="content">
    <!-- {#each Object.entries($pool) as [id, win]}
      <Win
        {...win}
        on:move={({ detail }) => {
          $pool[id].x = detail.x;
          $pool[id].y = detail.y;
        }}>
        sdf
      </Win>
    {/each} -->
  </div>
</div>
