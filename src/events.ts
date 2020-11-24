import { Controller } from "./controller";

export type ControllerInputEventData = {
  id: number;
  controllerDiff: Partial<Controller>;
};

export type ControllerInputEvent = CustomEvent<ControllerInputEventData>;
