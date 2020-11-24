import {
  ButtonDefinition,
  ControllerDefinition,
  ControllerInputDefinition,
  isButtonDefinition,
  GamepadButtonDefinition,
  KeyButtonDefinition,
  MouseButtonDefinition,
  AxisDefinition,
  GamepadAxisDefinition,
} from "./definition";
import { gamepadSource } from "./sources/gamepads";
import { keySource } from "./sources/keys";
import { mouseButtonSource } from "./sources/mouse-buttons";

export interface ControllerButton {
  pressed: boolean;
  value: number;
}

export function areControllerButtonsEqual(
  cb1: ControllerButton,
  cb2: ControllerButton
): boolean {
  return cb1.pressed === cb2.pressed && cb1.value === cb2.value;
}

const defaultControllerButton = (): ControllerButton => ({
  pressed: false,
  value: 0,
});

export interface ControllerAxis {
  value: number;
}

export function areControllerAxesEqual(
  ca1: ControllerAxis,
  ca2: ControllerAxis
) {
  return ca1.value === ca2.value;
}

const defaultControllerAxis = (): ControllerAxis => ({
  value: 0,
});

export type Controller = StandardController;

interface StandardController {
  button0: ControllerButton;
  button1: ControllerButton;
  button2: ControllerButton;
  button3: ControllerButton;
  button4: ControllerButton;
  button5: ControllerButton;
  button6: ControllerButton;
  button7: ControllerButton;
  button8: ControllerButton;
  button9: ControllerButton;
  button10: ControllerButton;
  button11: ControllerButton;
  button12: ControllerButton;
  button13: ControllerButton;
  button14: ControllerButton;
  button15: ControllerButton;
  button16: ControllerButton;
  axis0: ControllerAxis;
  axis1: ControllerAxis;
  axis2: ControllerAxis;
  axis3: ControllerAxis;
}

const controllerInputs = new Set([
  "button0",
  "button1",
  "button2",
  "button3",
  "button4",
  "button5",
  "button6",
  "button7",
  "button8",
  "button9",
  "button10",
  "button11",
  "button12",
  "button13",
  "button14",
  "button15",
  "button16",
  "axis0",
  "axis1",
  "axis2",
  "axis3",
]);

export class InternalController {
  private controllerDefinition: [
    keyof ControllerDefinition,
    ControllerInputDefinition
  ][];

  private controller: Controller;

  constructor(controllerDefinition: ControllerDefinition) {
    this.controllerDefinition = (Object.entries(controllerDefinition) as Array<
      [keyof ControllerDefinition, ControllerInputDefinition]
    >).filter(([key]) => controllerInputs.has(key));

    this.controller = {
      button0: defaultControllerButton(),
      button1: defaultControllerButton(),
      button2: defaultControllerButton(),
      button3: defaultControllerButton(),
      button4: defaultControllerButton(),
      button5: defaultControllerButton(),
      button6: defaultControllerButton(),
      button7: defaultControllerButton(),
      button8: defaultControllerButton(),
      button9: defaultControllerButton(),
      button10: defaultControllerButton(),
      button11: defaultControllerButton(),
      button12: defaultControllerButton(),
      button13: defaultControllerButton(),
      button14: defaultControllerButton(),
      button15: defaultControllerButton(),
      button16: defaultControllerButton(),

      axis0: defaultControllerAxis(),
      axis1: defaultControllerAxis(),
      axis2: defaultControllerAxis(),
      axis3: defaultControllerAxis(),
    };
  }

  public update = (): Partial<Controller> => {
    const controllerDiff: Partial<Controller> = {};

    this.controllerDefinition.forEach(([controllerInput, inputDefinition]) => {
      if (isButtonDefinition(controllerInput, inputDefinition)) {
        const button = this.updateButton(inputDefinition);
        if (
          !areControllerButtonsEqual(
            button,
            this.controller[controllerInput] as ControllerButton
          )
        ) {
          controllerDiff[controllerInput] = button;
          this.controller[controllerInput] = button;
        }
      } else {
        const axis = this.updateAxis(inputDefinition);
        if (
          !areControllerAxesEqual(
            axis,
            this.controller[controllerInput] as ControllerAxis
          )
        ) {
          controllerDiff[controllerInput] = axis as ControllerButton &
            ControllerAxis;
          this.controller[controllerInput] = axis as ControllerButton &
            ControllerAxis;
        }
      }
    });

    return controllerDiff;
  };

  private updateButton(buttonDefinition: ButtonDefinition): ControllerButton {
    switch (buttonDefinition.type) {
      case "gamepad":
        return this.updateGamepadButton(buttonDefinition);
      case "key":
        return this.updateKeyButton(buttonDefinition);
      case "mouse":
        return this.updateMouseButton(buttonDefinition);
    }
  }

  private updateGamepadButton(
    buttonDefinition: GamepadButtonDefinition
  ): ControllerButton {
    const button: GamepadButton = gamepadSource.getGamepadButton(
      buttonDefinition.gamepad,
      buttonDefinition.button
    );

    return {
      pressed: button.pressed,
      value: button.value,
    };
  }

  private updateKeyButton(
    buttonDefinition: KeyButtonDefinition
  ): ControllerButton {
    return keySource.isKeyPressed(buttonDefinition.code)
      ? {
          pressed: true,
          value: 1,
        }
      : {
          pressed: false,
          value: 0,
        };
  }

  private updateMouseButton(
    buttonDefinition: MouseButtonDefinition
  ): ControllerButton {
    return mouseButtonSource.isMouseButtonPressed(buttonDefinition.button)
      ? {
          pressed: true,
          value: 1,
        }
      : {
          pressed: false,
          value: 0,
        };
  }

  private updateAxis(axisDefinition: AxisDefinition): ControllerAxis {
    switch (axisDefinition.type) {
      case "gamepad":
        return this.updateGamepadAxis(axisDefinition);
    }
  }

  private updateGamepadAxis(
    axisDefinition: GamepadAxisDefinition
  ): ControllerAxis {
    const axis: number = gamepadSource.getGamepadAxis(
      axisDefinition.gamepad,
      axisDefinition.axis
    );

    return {
      value: axis,
    };
  }
}
