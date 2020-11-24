import { Controller, InternalController } from "@src/controller";
import { ControllerDefinition } from "@src/definition";
// import { ControllerChangeEvent } from "@src/events";
import { RequestAnimationFrameScheduler, Scheduler } from "@src/scheduler";
import { ControllerInputEventData } from "./events";

export type ControllerId = number;
let nextId: ControllerId = 0;

const controllers = new Map<ControllerId, InternalController>();

let scheduler: Scheduler;

export const startControllerInputEvents = (
  scheduler: Scheduler = new RequestAnimationFrameScheduler()
): void => {
  scheduler.schedule();
};

export const stopControllerInputEvents = (): void => {
  scheduler.unschedule();
};

export const addController = (
  controllerDefinition: ControllerDefinition
): ControllerId => {
  const id = nextId++;
  controllers.set(id, new InternalController(controllerDefinition));
  return id;
};

export const removeController = (id: ControllerId): void => {
  controllers.delete(id);
};

export const forceUpdate = (emitEvents = true): ControllerInputEventData[] => {
  const updatedControllers: ControllerInputEventData[] = [];

  controllers.forEach((controller, id) => {
    const controllerDiff = controller.update();
    if (Object.keys(controllerDiff).length > 0) {
      updatedControllers.push({
        controllerDiff,
        id,
      });
    }
  });

  if (emitEvents) {
    updatedControllers.forEach((controller) => {
      const event = new CustomEvent<ControllerInputEventData>(
        "controllerinput",
        { detail: controller }
      );

      window.dispatchEvent(event);
    });
  }

  return updatedControllers;
};
