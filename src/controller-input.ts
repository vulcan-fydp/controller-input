import {
  Axis,
  Controller,
  ControllerAxis,
  ControllerButton,
  ControllerTouchAnchor,
} from "./definition";
import { GamepadSource } from "./sources/gamepad";
import { KeyboardSource } from "./sources/keyboard";
import { PointerSource } from "./sources/pointer";
import {
  ControllerAxesState,
  ControllerAxisState,
  ControllerButtonsState,
  ControllerButtonState,
  ControllerState,
} from "./state";

export type ControllerId = number;

export class ControllerInput {
  private static nextId = 0;

  private controllers: Map<ControllerId, Controller>;

  private gamepadSource: GamepadSource;
  private keyboardSource: KeyboardSource;
  private pointerSource: PointerSource;

  constructor(private canvas: HTMLElement) {
    this.controllers = new Map<ControllerId, Controller>();

    this.gamepadSource = new GamepadSource();
    this.keyboardSource = new KeyboardSource();
    this.keyboardSource.start();
    this.pointerSource = new PointerSource(this.canvas);
  }

  /**
   * Adds a controller to gather input for
   */
  addController(controller: Controller): ControllerId {
    this.controllers.set(ControllerInput.nextId, {
      buttons: [...controller.buttons],
      axes: [...controller.axes],
    });

    return ControllerInput.nextId++;
  }

  removeController(controllerId: ControllerId): void {
    this.controllers.delete(controllerId);
  }

  getState(): Record<number, ControllerState> {
    const state: Record<number, ControllerState> = {};

    this.controllers.forEach((controller, id) => {
      state[id] = this.getControllerState(controller);
    });

    return state;
  }

  private getControllerState(controller: Controller): ControllerState {
    return {
      buttons: controller.buttons.map((button) =>
        this.getButtonState(button)
      ) as ControllerButtonsState,
      axes: controller.axes.map((axis) =>
        this.getAxisState(axis)
      ) as ControllerAxesState,
    };
  }

  private getButtonState(button: ControllerButton): ControllerButtonState {
    if (!button) {
      return {
        pressed: false,
        value: 0,
      };
    }

    switch (button.__typename) {
      case "ControllerGamepadButton": {
        const gamepadButton = this.gamepadSource.getGamepadButton(
          button.gamepadNumber,
          button.buttonNumber
        );
        return {
          pressed: gamepadButton.pressed,
          value: gamepadButton.value,
        };
      }
      case "ControllerKeyboardButton": {
        const pressed = this.keyboardSource.isKeyPressed(button.keyCode);
        return {
          pressed,
          value: pressed ? 1 : 0,
        };
      }
      case "ControllerMouseButton": {
        const pressed = this.pointerSource.isButtonPressed(button.buttonNumber);
        return {
          pressed,
          value: pressed ? 1 : 0,
        };
      }
      case "ControllerTouchButton": {
        const pointer = this.pointerSource.getPointerInitiallyPressedWithin(
          ...this.getPoint(button.anchor, button.xOffset, button.yOffset),
          button.radius
        );
        const pressed = !!pointer && pointer.within;
        return {
          pressed,
          value: pressed ? 1 : 0,
        };
      }
    }
  }

  private getAxisState(axis: ControllerAxis): ControllerAxisState {
    if (!axis) {
      return {
        value: 0,
      };
    }

    switch (axis.__typename) {
      case "ControllerDragAxis": {
        throw new Error();
      }
      case "ControllerGamepadAxis": {
        const gamepadAxis = this.gamepadSource.getGamepadAxis(
          axis.controllerNumber,
          axis.axisNumber
        );
        return {
          value: gamepadAxis,
        };
      }
      case "ControllerKeyboardAxis": {
        let value = 0;
        if (this.keyboardSource.isKeyPressed(axis.negativeKeyCode)) {
          value -= 1;
        }
        if (this.keyboardSource.isKeyPressed(axis.positiveKeyCode)) {
          value += 1;
        }
        return {
          value,
        };
      }
      case "ControllerMouseAxis": {
        throw new Error();
      }
      case "ControllerTouchJoystickAxis": {
        const val = this.pointerSource.getPointerInitiallyPressedWithin(
          ...this.getPoint(axis.anchor, axis.xOffset, axis.yOffset),
          axis.radius
        );
        if (!val) {
          return {
            value: 0,
          };
        }
        return {
          value: axis.axis === Axis.HORIZONTAL ? val.x : val.y,
        };
      }
    }
  }

  private getPoint(
    anchor: ControllerTouchAnchor,
    x: number,
    y: number
  ): [number, number] {
    switch (anchor) {
      case ControllerTouchAnchor.BOTTOM_LEFT:
        return [x, this.canvas.clientHeight - y];
      case ControllerTouchAnchor.BOTTOM_RIGHT:
        return [this.canvas.clientWidth - x, this.canvas.clientHeight - y];
    }
  }
}
