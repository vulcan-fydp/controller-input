export type ButtonDefinition =
  | KeyButtonDefinition
  | GamepadButtonDefinition
  | MouseButtonDefinition;

export function isButtonDefinition(
  input: string,
  definition: unknown
): definition is ButtonDefinition {
  return input.includes("button");
}

export interface KeyButtonDefinition {
  type: "key";
  code: string;
}

export function key(keyCode: string): KeyButtonDefinition {
  return {
    type: "key",
    code: keyCode,
  };
}

export interface GamepadButtonDefinition {
  type: "gamepad";
  gamepad: Gamepad["index"];
  button: number;
}

export function gamepadButton(
  gamepad: Gamepad["index"],
  buttonIndex: number
): GamepadButtonDefinition {
  return {
    type: "gamepad",
    gamepad: gamepad,
    button: buttonIndex,
  };
}

export interface MouseButtonDefinition {
  type: "mouse";
  button: number;
}

export function mouseButton(buttonIndex: number): MouseButtonDefinition {
  return {
    type: "mouse",
    button: buttonIndex,
  };
}

export type AxisDefinition = GamepadAxisDefinition;

export interface GamepadAxisDefinition {
  type: "gamepad";
  gamepad: Gamepad;
  axis: number;
}

export function gamepadAxis(
  gamepad: Gamepad,
  axis: number
): GamepadAxisDefinition {
  return {
    type: "gamepad",
    gamepad,
    axis,
  };
}

export type ControllerInputDefinition = AxisDefinition | ButtonDefinition;

export interface ControllerDefinition {
  button0?: ButtonDefinition;
  button1?: ButtonDefinition;
  button2?: ButtonDefinition;
  button3?: ButtonDefinition;
  button4?: ButtonDefinition;
  button5?: ButtonDefinition;
  button6?: ButtonDefinition;
  button7?: ButtonDefinition;
  button8?: ButtonDefinition;
  button9?: ButtonDefinition;
  button10?: ButtonDefinition;
  button11?: ButtonDefinition;
  button12?: ButtonDefinition;
  button13?: ButtonDefinition;
  button14?: ButtonDefinition;
  button15?: ButtonDefinition;
  button16?: ButtonDefinition;

  axis0?: AxisDefinition;
  axis1?: AxisDefinition;
  axis2?: AxisDefinition;
  axis3?: AxisDefinition;
}
