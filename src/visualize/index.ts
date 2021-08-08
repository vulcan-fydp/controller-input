import type { ControllerState } from "@src/state";
import * as controllerSvg from "./controller.svg";

const ID = "controller-input-visualization";

const buttonColors: Record<number, { unpressed: string; pressed: string }> = {
  0: {
    unpressed: "#c8c8c8",
    pressed: "#ff0000",
  },
  1: {
    unpressed: "#c8c8c8",
    pressed: "#ff0000",
  },
  2: {
    unpressed: "#c8c8c8",
    pressed: "#ff0000",
  },
  3: {
    unpressed: "#c8c8c8",
    pressed: "#ff0000",
  },
  4: {
    unpressed: "#808080",
    pressed: "#ff0000",
  },
  5: {
    unpressed: "#808080",
    pressed: "#ff0000",
  },
  6: {
    unpressed: "#808080",
    pressed: "#ff0000",
  },
  7: {
    unpressed: "#808080",
    pressed: "#ff0000",
  },
  8: {
    unpressed: "#595959",
    pressed: "#ff0000",
  },
  9: {
    unpressed: "#595959",
    pressed: "#ff0000",
  },
  10: {
    unpressed: "#404040",
    pressed: "#ff0000",
  },
  11: {
    unpressed: "#404040",
    pressed: "#ff0000",
  },
  12: {
    unpressed: "#404040",
    pressed: "#ff0000",
  },
  13: {
    unpressed: "#404040",
    pressed: "#ff0000",
  },
  14: {
    unpressed: "#404040",
    pressed: "#ff0000",
  },
  15: {
    unpressed: "#404040",
    pressed: "#ff0000",
  },
  16: {
    unpressed: "#595959",
    pressed: "#ff0000",
  },
};

const AXIS_RADIUS = 75;

const AXIS_01_CX = 628;
const AXIS_23_CX = 944;
const AXIS_CY = 382.5;

export function initializeControllerStateVisualization() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.position = "fixed";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.innerHTML = controllerSvg;
  svg.id = ID;
  document.body.appendChild(svg);
}

export function visualizeControllerState(state: ControllerState): void {
  const svg = document.getElementById(ID);
  if (!(svg instanceof SVGSVGElement)) {
    throw new Error("Could not find svg element");
  }

  if (svg) {
    for (let i = 0; i < 17; i++) {
      const buttonElement = svg.getElementById(`button${i}`);
      if (
        !(buttonElement instanceof SVGPathElement) &&
        !(buttonElement instanceof SVGRectElement)
      ) {
        console.log(svg);
        throw new Error(`Count not find path element button${i}`);
      }

      buttonElement.style.fill = state.buttons[i].pressed
        ? buttonColors[i].pressed
        : buttonColors[i].unpressed;
    }

    const axis01 = svg.getElementById("axis01");
    if (!(axis01 instanceof SVGCircleElement)) {
      throw new Error("Could not find axis01");
    }
    axis01.setAttribute(
      "cx",
      `${AXIS_01_CX + state.axes[0].value * AXIS_RADIUS}`
    );
    axis01.setAttribute("cy", `${AXIS_CY + state.axes[1].value * AXIS_RADIUS}`);

    const axis23 = svg.getElementById("axis23");
    if (!axis23) {
      throw new Error("Could not find axis23");
    }
    axis23.setAttribute(
      "cx",
      `${AXIS_23_CX + state.axes[2].value * AXIS_RADIUS}`
    );
    axis23.setAttribute("cy", `${AXIS_CY + state.axes[3].value * AXIS_RADIUS}`);
  }
}
