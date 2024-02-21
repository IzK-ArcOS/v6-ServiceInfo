import { AppRuntime } from "$ts/apps";
import { ServiceInfoIcon } from "$ts/images/apps";
import { sendNotification } from "$ts/notif";
import { Process } from "$ts/process";
import { createErrorDialog } from "$ts/process/error";
import { getService } from "$ts/service/interact";
import { Store } from "$ts/writable";
import type { App } from "$types/app";
import { LogLevel } from "$types/console";
import { Service } from "$types/service";
import { ReadableStore } from "$types/writable";
import StartCondition from "../Components/StartCondition.svelte";

export class ServiceInfoRuntime extends AppRuntime {
  public _targetService: ReadableStore<Service> = Store<Service>();
  public _targetId: ReadableStore<string> = Store<string>();

  constructor(app: App, mutator: ReadableStore<App>, process: Process) {
    super(app, mutator, process);

    function stop(arg?: string) {
      process.handler.kill(process.pid, true);

      const suffix = arg ? ` Service "${arg}" could not be found.` : "";

      sendNotification({
        title: "Can't open Service Info",
        message: `Service Info was opened without a valid Service ID to pull the information from.${suffix}`,
        image: ServiceInfoIcon,
        /* timeout: 3000, */
      });
    }

    const arg = process.args[0] as string;

    if (!arg || typeof arg !== "string") {
      stop();

      this.Log(
        "Not opening ServiceInfo without an ID to pull data from",
        "constructor",
        LogLevel.error
      );

      return;
    }

    const targetService = getService(arg);

    if (!targetService) {
      stop(arg);

      this.Log(
        "Not opening ServiceInfo without a valid app-ID to pull data from.",
        "constructor",
        LogLevel.error
      );

      return;
    }

    this.setWindowTitle(`Information about ${targetService.name}`);

    this._targetId.set(arg);
    this._targetService.set(targetService);
  }

  public startConditionDialog() {
    createErrorDialog(
      {
        title: "Start Condition",
        component: StartCondition,
        buttons: [{ caption: "Understood", action() {}, suggested: true }],
        image: ServiceInfoIcon,
        sound: "arcos.dialog.info",
      },
      this.process.pid,
      true
    );
  }
}
