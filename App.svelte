<script lang="ts">
  import { Service } from "$types/service";
  import { onMount } from "svelte";
  import Actions from "./Components/Actions.svelte";
  import Header from "./Components/Header.svelte";
  import IndepthInfo from "./Components/IndepthInfo.svelte";
  import ProcessInfo from "./Components/ProcessInfo.svelte";
  import "./css/main.css";
  import { ServiceInfoRuntime } from "./ts/runtime";

  export let runtime: ServiceInfoRuntime;

  let id: string;
  let target: Service;

  onMount(() => {
    runtime._targetService.subscribe((v) => (target = v));
    runtime._targetId.subscribe((v) => (id = v));
  });
</script>

{#if id && target}
  <Header {target} {id} />
  <IndepthInfo {runtime} {target} />
  <ProcessInfo {id}></ProcessInfo>
  <Actions {runtime}></Actions>
{/if}
