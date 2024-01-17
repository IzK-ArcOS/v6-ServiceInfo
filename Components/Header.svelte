<script lang="ts">
  import { ServiceInfoIcon } from "$ts/images/apps";
  import { GlobalDispatch } from "$ts/process/dispatch/global";
  import { getService, startService, stopService } from "$ts/service/interact";
  import {
    startServiceNotified,
    stopServiceNotified,
  } from "$ts/service/wrapper";
  import { Service } from "$types/service";
  import { onMount } from "svelte";

  export let target: Service;
  export let id: string;

  let stopped = false;

  function update() {
    stopped = !getService(id).pid;
  }

  onMount(update);
  GlobalDispatch.subscribe("services-flush", update);

  async function toggleDisable() {
    if (target.pid) await stopServiceNotified(id);
    else await startServiceNotified(id);
  }
</script>

<div class="header">
  <div class="left">
    <img src={ServiceInfoIcon} alt="" />
    <div class="base-info">
      <p class="name">
        <span>{target.name}</span>
      </p>
      <p class="description">{target.description}</p>
    </div>
  </div>
  <div class="right">
    <button class="flip" class:stopped on:click={toggleDisable}>
      {stopped ? "Start" : "Stop"}
    </button>
  </div>
</div>
