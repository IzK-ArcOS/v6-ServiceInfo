<script lang="ts">
  import InfoBlock from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock.svelte";
  import InfoRow from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/InfoRow.svelte";
  import Segment from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/Row/Segment.svelte";
  import { GlobalDispatch } from "$ts/process/dispatch/global";
  import { getService } from "$ts/service/interact";
  import { Service } from "$types/service";
  import { onMount } from "svelte";

  export let id: string;

  let service: Service;

  function update() {
    service = getService(id);
  }

  onMount(update);
  GlobalDispatch.subscribe("services-flush", update);
</script>

{#if service}
  <InfoBlock>
    <InfoRow>
      <Segment title="Status">
        {service.pid ? "Running" : "Stopped"}
      </Segment>
      <Segment title="First PID">
        {service.pid || "-"}
      </Segment>
    </InfoRow>
  </InfoBlock>
{/if}
