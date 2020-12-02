import { Controller } from "./controller";

export type ControllerInputEventData = {
  id: number;
  controller: Controller;
};

export type ControllerInputEvent = CustomEvent<ControllerInputEventData>;
