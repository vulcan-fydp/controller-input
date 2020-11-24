import { Controller, InternalController } from "@src/controller";
import { ControllerDefinition } from "@src/definition";
// import { ControllerChangeEvent } from "@src/events";
import { RequestAnimationFrameScheduler, Scheduler } from "@src/scheduler";
import { ControllerInputEventData } from "./events";

const controllers = new Map<ControllerDefinition, InternalController>();

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
): void => {
  controllers.set(
    controllerDefinition,
    new InternalController(controllerDefinition)
  );
};

export const removeController = (
  controllerDefinition: ControllerDefinition
): void => {
  controllers.delete(controllerDefinition);
};

export const forceUpdate = (emitEvents = true): Controller[] => {
  const updatedControllers: Controller[] = [];

  controllers.forEach((controller) => {
    const updatedController = controller.update();
    if (updatedController) {
      updatedControllers.push(updatedController);
    }
  });

  if (emitEvents) {
    updatedControllers.forEach((controller) => {
      const event = new CustomEvent<ControllerInputEventData>(
        "controllerinput",
        { detail: { controller } }
      );

      window.dispatchEvent(event);
    });
  }

  return updatedControllers;
};
