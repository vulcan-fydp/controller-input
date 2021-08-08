import { Source } from ".";

export class GamepadSource extends Source {
  start() {
    this.started = true;
  }

  stop() {
    this.started = false;
  }

  public getGamepadButton(gamepad: number, button: number): GamepadButton {
    const gamepadObj = navigator.getGamepads()[gamepad];

    if (!gamepadObj) {
      throw "bad";
    }

    return gamepadObj.buttons[button];
  }

  public getGamepadAxis(gamepad: number, axis: number): number {
    const gamepadObj = navigator.getGamepads()[gamepad];

    if (!gamepadObj) {
      throw "bad";
    }

    return gamepadObj.axes[axis];
  }
}
