<script lang="ts">
  import { ServiceInfoRuntime } from "../ts/runtime";

  export let runtime: ServiceInfoRuntime;

  function close() {
    runtime.process.handler.kill(runtime.process.pid, true);
  }
</script>

<div class="info-block actions">
  <div class="row">
    <button class="suggested" on:click={close}>Close</button>
  </div>
</div>
