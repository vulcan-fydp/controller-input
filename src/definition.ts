export enum ControllerTouchAnchor {
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

export enum Axis {
  HORIZONTAL,
  VERTICAL,
}

export interface ControllerKeyboardButton {
  __typename: "ControllerKeyboardButton";
  keyCode: string;
}

export interface ControllerGamepadButton {
  __typename: "ControllerGamepadButton";
  gamepadNumber: number;
  buttonNumber: number;
}

export interface ControllerMouseButton {
  __typename: "ControllerMouseButton";
  buttonNumber: number;
}

export interface ControllerTouchButton {
  __typename: "ControllerTouchButton";
  anchor: ControllerTouchAnchor;
  xOffset: number;
  yOffset: number;
  radius: number;
}

export type ControllerButton =
  | ControllerKeyboardButton
  | ControllerGamepadButton
  | ControllerMouseButton
  | ControllerTouchButton
  | null;

export interface ControllerKeyboardAxis {
  __typename: "ControllerKeyboardAxis";
  negativeKeyCode: string;
  positiveKeyCode: string;
}

export interface ControllerGamepadAxis {
  __typename: "ControllerGamepadAxis";
  controllerNumber: number;
  axisNumber: number;
}

export interface ControllerMouseAxis {
  __typename: "ControllerMouseAxis";
  axis: Axis;
}
export interface ControllerDragAxis {
  __typename: "ControllerDragAxis";
  axis: Axis;
}

export interface ControllerTouchJoystickAxis {
  __typename: "ControllerTouchJoystickAxis";
  anchor: ControllerTouchAnchor;
  xOffset: number;
  yOffset: number;
  radius: number;
  axis: Axis;
}

export type ControllerAxis =
  | ControllerKeyboardAxis
  | ControllerGamepadAxis
  | ControllerMouseAxis
  | ControllerDragAxis
  | ControllerTouchJoystickAxis
  | null;

export interface Controller {
  buttons: [
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton,
    ControllerButton
  ];
  axes: [ControllerAxis, ControllerAxis, ControllerAxis, ControllerAxis];
}
