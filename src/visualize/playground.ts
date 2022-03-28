import {
  initializeControllerStateVisualization,
  visualizeControllerState,
} from ".";
import {
  Axis,
  Controller,
  ControllerInput,
  ControllerTouchAnchor,
  ControllerTouchButton,
  ControllerTouchJoystickAxis,
} from "..";

export function playground(): void {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  initializeControllerStateVisualization();
  const controllerInput = new ControllerInput(canvas);

  const keyboardController: Controller = {
    buttons: [
      { __typename: "ControllerKeyboardButton", keyCode: "Digit0" },
      { __typename: "ControllerKeyboardButton", keyCode: "Digit1" },
      { __typename: "ControllerKeyboardButton", keyCode: "Digit2" },
      { __typename: "ControllerKeyboardButton", keyCode: "Digit3" },
      { __typename: "ControllerKeyboardButton", keyCode: "Digit4" },
      { __typename: "ControllerKeyboardButton", keyCode: "Digit5" },
      { __typename: "ControllerKeyboardButton", keyCode: "Digit6" },
      { __typename: "ControllerKeyboardButton", keyCode: "Digit7" },
      { __typename: "ControllerKeyboardButton", keyCode: "Digit8" },
      { __typename: "ControllerKeyboardButton", keyCode: "Digit9" },
      { __typename: "ControllerKeyboardButton", keyCode: "KeyA" },
      { __typename: "ControllerKeyboardButton", keyCode: "KeyB" },
      { __typename: "ControllerKeyboardButton", keyCode: "KeyC" },
      { __typename: "ControllerKeyboardButton", keyCode: "KeyD" },
      { __typename: "ControllerKeyboardButton", keyCode: "KeyE" },
      { __typename: "ControllerKeyboardButton", keyCode: "KeyF" },
      { __typename: "ControllerKeyboardButton", keyCode: "KeyG" },
    ],
    axes: [
      {
        __typename: "ControllerKeyboardAxis",
        negativeKeyCode: "ArrowLeft",
        positiveKeyCode: "ArrowRight",
      },
      {
        __typename: "ControllerKeyboardAxis",
        negativeKeyCode: "ArrowUp",
        positiveKeyCode: "ArrowDown",
      },
      {
        __typename: "ControllerKeyboardAxis",
        negativeKeyCode: "KeyJ",
        positiveKeyCode: "KeyL",
      },
      {
        __typename: "ControllerKeyboardAxis",
        negativeKeyCode: "KeyI",
        positiveKeyCode: "KeyK",
      },
    ],
  };

  const touchController: Controller = {
    buttons: [
      {
        __typename: "ControllerTouchButton",
        anchor: ControllerTouchAnchor.BOTTOM_LEFT,
        xOffset: 100,
        yOffset: 170,
        radius: 15,
      },
      {
        __typename: "ControllerTouchButton",
        anchor: ControllerTouchAnchor.BOTTOM_RIGHT,
        xOffset: 100,
        yOffset: 170,
        radius: 15,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    axes: [
      {
        __typename: "ControllerTouchJoystickAxis",
        anchor: ControllerTouchAnchor.BOTTOM_LEFT,
        xOffset: 100,
        yOffset: 100,
        radius: 50,
        axis: Axis.HORIZONTAL,
      },
      {
        __typename: "ControllerTouchJoystickAxis",
        anchor: ControllerTouchAnchor.BOTTOM_LEFT,
        xOffset: 100,
        yOffset: 100,
        radius: 50,
        axis: Axis.VERTICAL,
      },
      null,
      null,
    ],
  };

  controllerInput.addController(touchController);

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.strokeStyle = "#FF0000";

  const w = canvas.width;
  const h = canvas.height;

  function drawCircle(
    anchor: ControllerTouchAnchor,
    rx: number,
    ry: number,
    radius: number
  ) {
    let x: number;
    if (anchor === ControllerTouchAnchor.BOTTOM_LEFT) {
      x = rx;
    } else {
      x = w - rx;
    }

    const y = h - ry;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 3.14159 * 2);
    ctx.stroke();
  }

  for (const button of touchController.buttons) {
    if (!button) {
      continue;
    }
    const t = button as ControllerTouchButton;
    drawCircle(t.anchor, t.xOffset, t.yOffset, t.radius);
  }

  for (const axis of touchController.axes) {
    if (!axis) {
      continue;
    }
    const t = axis as ControllerTouchJoystickAxis;
    drawCircle(t.anchor, t.xOffset, t.yOffset, t.radius);
  }

  const loop = () => {
    const state = controllerInput.getState()[0];

    visualizeControllerState(state);

    requestAnimationFrame(loop);
  };

  loop();
}
