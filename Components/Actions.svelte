<script lang="ts">
  import InfoBlock from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock.svelte";
  import InfoRow from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/InfoRow.svelte";
  import { ServiceInfoRuntime } from "../ts/runtime";

  export let runtime: ServiceInfoRuntime;

  function close() {
    runtime.process.handler.kill(runtime.process.pid, true);
  }
</script>

<InfoBlock className="actions">
  <InfoRow>
    <button class="suggested" on:click={close}>Close</button>
  </InfoRow>
</InfoBlock>
