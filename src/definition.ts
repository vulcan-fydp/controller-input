export type ButtonDefinition =
  | KeyButtonDefinition
  | GamepadButtonDefinition
  | PointerButtonDefinition;

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

export interface PointerButtonDefinition {
  type: "pointer";
  button: number;
}

export function mouseButton(buttonIndex: number): PointerButtonDefinition {
  return {
    type: "pointer",
    button: buttonIndex,
  };
}

export interface PositionalButtonDefinition {
  type: "positional";
  x: number;
  y: number;
  paddingX: number;
  paddingY: number;
}

export function positionalButton(
  x: number,
  y: number,
  paddingX: number,
  paddingY: number = paddingX
): PositionalButtonDefinition {
  return {
    type: "positional",
    x,
    y,
    paddingX,
    paddingY,
  };
}

export type AxisDefinition = GamepadAxisDefinition;

export interface GamepadAxisDefinition {
  type: "gamepad";
  gamepad: Gamepad["index"];
  axis: number;
  threshold: number;
}

export function gamepadAxis(
  gamepad: Gamepad["index"],
  axis: number,
  threshold = 0.02
): GamepadAxisDefinition {
  return {
    type: "gamepad",
    gamepad,
    axis,
    threshold,
  };
}

export interface MouseAxisDefinition {
  type: "mouse";
  axis: "x" | "y";
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

export function gamepad(gamepad: number): ControllerDefinition {
  return {
    button0: gamepadButton(gamepad, 0),
    button1: gamepadButton(gamepad, 1),
    button2: gamepadButton(gamepad, 2),
    button3: gamepadButton(gamepad, 3),
    button4: gamepadButton(gamepad, 4),
    button5: gamepadButton(gamepad, 5),
    button6: gamepadButton(gamepad, 6),
    button7: gamepadButton(gamepad, 7),
    button8: gamepadButton(gamepad, 8),
    button9: gamepadButton(gamepad, 9),
    button10: gamepadButton(gamepad, 10),
    button11: gamepadButton(gamepad, 11),
    button12: gamepadButton(gamepad, 12),
    button13: gamepadButton(gamepad, 13),
    button14: gamepadButton(gamepad, 14),
    button15: gamepadButton(gamepad, 15),
    button16: gamepadButton(gamepad, 16),
    axis0: gamepadAxis(gamepad, 0),
    axis1: gamepadAxis(gamepad, 1),
    axis2: gamepadAxis(gamepad, 2),
    axis3: gamepadAxis(gamepad, 3),
  };
}
