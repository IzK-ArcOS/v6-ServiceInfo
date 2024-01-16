<script lang="ts">
  import { GlobalDispatch } from "$ts/process/dispatch/global";
  import { getService } from "$ts/service/interact";
  import { Service } from "$types/service";
  import { onMount } from "svelte";
  import Segment from "./IndepthInfo/Segment.svelte";

  export let id: string;

  let service: Service;

  function update() {
    service = getService(id);
  }

  onMount(update);
  GlobalDispatch.subscribe("services-flush", update);
</script>

{#if service}
  <div class="info-block">
    <div class="row">
      <Segment title="Status">
        {service.pid ? "Running" : "Stopped"}
      </Segment>
      <Segment title="First PID">
        {service.pid || "-"}
      </Segment>
    </div>
  </div>
{/if}
