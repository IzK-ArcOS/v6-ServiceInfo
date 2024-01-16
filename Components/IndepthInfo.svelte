<script lang="ts">
  import { App } from "$types/app";
  import { Service } from "$types/service";
  import dayjs from "dayjs";
  import { ServiceInfoRuntime } from "../ts/runtime";
  import Segment from "./IndepthInfo/Segment.svelte";

  export let target: Service;
  export let runtime: ServiceInfoRuntime;

  const loadedAt = dayjs(target.loadedAt).format("MMM D, HH:mm:ss");
  const changedAt = dayjs(target.changedAt).format("MMM D, HH:mm:ss");

  function startConditionHelp() {
    runtime.startConditionDialog();
  }
</script>

<div class="info-block">
  <div class="row">
    <Segment title="Identifier">
      {target.id}
    </Segment>
    <Segment title="Initial State">
      {target.initialState || "stopped"}
    </Segment>
    <Segment title="Handler">Stack</Segment>
  </div>
  <div class="row">
    <Segment title="Loaded At">
      {loadedAt}
    </Segment>
    <Segment title="Changed At">
      {changedAt}
    </Segment>
  </div>
  {#if target.startCondition}
    <div class="row">
      <Segment title="Start Condition" help={startConditionHelp}>
        <code>
          {target.startCondition}
        </code>
      </Segment>
    </div>
  {/if}
</div>
