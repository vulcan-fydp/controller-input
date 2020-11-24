import { Controller } from "./controller";

export type ControllerInputEventData = {
  controller: Controller;
};

export type ControllerInputEvent = CustomEvent<ControllerInputEventData>;
