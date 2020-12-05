import {
  ButtonDefinition,
  ControllerDefinition,
  ControllerInputDefinition,
  isButtonDefinition,
  GamepadButtonDefinition,
  KeyButtonDefinition,
  PointerButtonDefinition,
  PositionalButtonDefinition,
  AxisDefinition,
  GamepadAxisDefinition,
} from "./definition";
import { gamepadSource } from "./sources/gamepads";
import { keySource } from "./sources/keys";
import { pointerSource } from "./sources/pointer";

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
  ca2: ControllerAxis,
  threshold = 0.02
): boolean {
  return Math.abs(ca1.value - ca2.value) <= threshold;
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

  public update = (): Controller | undefined => {
    let controllerUpdated = false;

    this.controllerDefinition.forEach(([controllerInput, inputDefinition]) => {
      if (isButtonDefinition(controllerInput, inputDefinition)) {
        const button = this.updateButton(inputDefinition);
        if (
          !areControllerButtonsEqual(
            button,
            this.controller[controllerInput] as ControllerButton
          )
        ) {
          controllerUpdated = true;
          this.controller[controllerInput] = button;
        }
      } else {
        const axis = this.updateAxis(inputDefinition);
        if (
          !areControllerAxesEqual(
            axis,
            this.controller[controllerInput] as ControllerAxis,
            inputDefinition.threshold
          )
        ) {
          controllerUpdated = true;
          this.controller[controllerInput] = axis as ControllerButton &
            ControllerAxis;
        }
      }
    });

    return controllerUpdated ? this.getController() : undefined;
  };

  public getController(): Controller {
    return {
      button0: { ...this.controller.button0 },
      button1: { ...this.controller.button1 },
      button2: { ...this.controller.button2 },
      button3: { ...this.controller.button3 },
      button4: { ...this.controller.button4 },
      button5: { ...this.controller.button5 },
      button6: { ...this.controller.button6 },
      button7: { ...this.controller.button7 },
      button8: { ...this.controller.button8 },
      button9: { ...this.controller.button9 },
      button10: { ...this.controller.button10 },
      button11: { ...this.controller.button11 },
      button12: { ...this.controller.button12 },
      button13: { ...this.controller.button13 },
      button14: { ...this.controller.button14 },
      button15: { ...this.controller.button15 },
      button16: { ...this.controller.button16 },
      axis0: { ...this.controller.axis0 },
      axis1: { ...this.controller.axis1 },
      axis2: { ...this.controller.axis2 },
      axis3: { ...this.controller.axis3 },
    };
  }

  private updateButton(buttonDefinition: ButtonDefinition): ControllerButton {
    switch (buttonDefinition.type) {
      case "gamepad":
        return this.updateGamepadButton(buttonDefinition);
      case "key":
        return this.updateKeyButton(buttonDefinition);
      case "pointer":
        return this.updatePointerButton(buttonDefinition);
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

  private updatePointerButton(
    buttonDefinition: PointerButtonDefinition
  ): ControllerButton {
    return pointerSource.isButtonPressed(buttonDefinition.button)
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
