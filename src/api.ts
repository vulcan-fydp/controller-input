import { InternalController } from "./controller";
import { ControllerDefinition } from "./definition";
import { RequestAnimationFrameScheduler, Scheduler } from "./scheduler";
import { ControllerInputEventData } from "./events";

/**
 * A unique identifier for a Controller
 */
export type ControllerId = number;
let nextId: ControllerId = 0;

const controllers = new Map<ControllerId, InternalController>();

let scheduler: Scheduler;

/**
 * Begins listening for input events and emits an event when a controller input changes
 * @param scheduler - Schedules when inputs will be polled, by default uses requestAnimationFrame
 */
export const startControllerInputEvents = (
  scheduler: Scheduler = new RequestAnimationFrameScheduler()
): void => {
  scheduler.schedule();
};

/**
 * Stops polling inputs for changes and emitting events
 */
export const stopControllerInputEvents = (): void => {
  scheduler.unschedule();
};

/**
 * Adds a controller to be checked for input events
 * @param controllerDefinition Which inputs to read from
 * @returns The unique id referencing this controller
 */
export const addController = (
  controllerDefinition: ControllerDefinition
): ControllerId => {
  const id = nextId++;
  controllers.set(id, new InternalController(controllerDefinition));
  return id;
};

/**
 * Removes a controller, it will no longer receive change events
 * @param id The unique id referencing a controller
 */
export const removeController = (id: ControllerId): void => {
  controllers.delete(id);
};

/**
 * Forcibly update the controllers now
 * @param emitEvents If true, events will also be emitted
 * @returns The data that would be emitted as events
 */
export const forceUpdate = (emitEvents = true): ControllerInputEventData[] => {
  const updatedControllers: ControllerInputEventData[] = [];

  controllers.forEach((controller, id) => {
    const updatedController = controller.update();
    if (updatedController) {
      updatedControllers.push({
        controller: updatedController,
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
