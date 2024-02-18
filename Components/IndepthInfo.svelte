<script lang="ts">
  import InfoBlock from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock.svelte";
  import InfoRow from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/InfoRow.svelte";
  import Segment from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/Row/Segment.svelte";
  import { Service } from "$types/service";
  import dayjs from "dayjs";
  import { ServiceInfoRuntime } from "../ts/runtime";

  export let target: Service;
  export let runtime: ServiceInfoRuntime;

  const loadedAt = dayjs(target.loadedAt).format("MMM D, HH:mm:ss");
  const changedAt = dayjs(target.changedAt).format("MMM D, HH:mm:ss");

  function startConditionHelp() {
    runtime.startConditionDialog();
  }
</script>

<InfoBlock>
  <InfoRow>
    <Segment title="Identifier">
      {target.id}
    </Segment>
    <Segment title="Initial State">
      {target.initialState || "stopped"}
    </Segment>
    <Segment title="Handler">Stack</Segment>
  </InfoRow>
  <InfoRow>
    <Segment title="Loaded At">
      {loadedAt}
    </Segment>
    <Segment title="Changed At">
      {changedAt}
    </Segment>
  </InfoRow>
  {#if target.startCondition}
    <InfoRow>
      <Segment title="Start Condition" help={startConditionHelp}>
        <code>
          {target.startCondition}
        </code>
      </Segment>
    </InfoRow>
  {/if}
</InfoBlock>
