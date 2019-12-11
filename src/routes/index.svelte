<script context="module">
  import { goto } from "@sapper/app";
  export async function preload(page, session) {}
</script>

<script>
  //   import { goto } from "@sapper/app";

  //   goto("/about");
</script>

<style>
  iframe {
    flex: 1;
    border: none;
  }
  .root {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  iframe body {
    border: 2px solid #333;
  }
</style>

<div class="root">
  <div class="toolbox" />
  <div class="content">
    <!-- <iframe src="http://www.baidu.com" /> -->
  </div>
</div>
