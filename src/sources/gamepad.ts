import { Source } from ".";

export class GamepadSource extends Source {
  start(): void {
    this.started = true;
  }

  stop(): void {
    this.started = false;
  }

  public getGamepadButton(gamepad: number, button: number): GamepadButton {
    const gamepadObj = navigator.getGamepads()[gamepad];

    if (!gamepadObj) {
      return {
        pressed: false,
        touched: false,
        value: 0,
      };
    }

    return gamepadObj.buttons[button];
  }

  public getGamepadAxis(gamepad: number, axis: number): number {
    const gamepadObj = navigator.getGamepads()[gamepad];

    if (!gamepadObj) {
      return 0;
    }

    return gamepadObj.axes[axis];
  }
}
