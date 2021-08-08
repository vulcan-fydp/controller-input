import { Source } from ".";

interface Pointer {
  startX: number;
  startY: number;
  x: number;
  y: number;
  force: number;
  id: number;
  buttons: number;
}

function pointInCircle(
  px: number,
  py: number,
  cx: number,
  cy: number,
  radius: number
) {
  return (px - cx) * (px - cx) + (py - cy) * (py - cy) <= radius * radius;
}

export class PointerSource extends Source {
  private buttonsPressed: Set<number>;
  private pointers: Map<number, Pointer>;

  constructor(private canvas: HTMLCanvasElement) {
    super();

    this.buttonsPressed = new Set();
    this.pointers = new Map();

    this.start();
  }

  public start() {
    if (this.started) {
      return;
    }

    this.started = true;

    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    this.canvas.addEventListener("pointerup", this.onPointerUp);
    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointercancel", this.onPointerCancel);
  }

  public stop() {
    if (!this.started) {
      return;
    }

    this.started = false;

    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointercancel", this.onPointerCancel);
  }

  public isButtonPressed(button: number): boolean {
    return this.buttonsPressed.has(button);
  }

  public pointerWithin(
    cx: number,
    cy: number,
    radius: number
  ): { x: number; y: number } | undefined {
    for (const [, pointer] of this.pointers) {
      if (pointInCircle(pointer.x, pointer.y, cx, cy, radius)) {
        return {
          x: (pointer.x - cx) / radius,
          y: (pointer.y - cy) / radius,
        };
      }
    }

    return undefined;
  }

  private onPointerDown = (pointerEvent: PointerEvent) => {
    const pointer = this.getPointer(pointerEvent);
    this.buttonsPressed.add(pointerEvent.button);

    pointer.startX = pointerEvent.offsetX;
    pointer.startY = pointerEvent.offsetY;

    pointer.buttons = pointerEvent.buttons;

    pointerEvent.preventDefault();
  };

  private onPointerUp = (pointerEvent: PointerEvent) => {
    const pointer = this.getPointer(pointerEvent);
    this.buttonsPressed.delete(pointerEvent.button);

    pointer.buttons = pointerEvent.buttons;

    pointerEvent.preventDefault();
  };

  private onPointerMove = (pointerEvent: PointerEvent) => {
    const pointer = this.getPointer(pointerEvent);

    pointer.x = pointerEvent.offsetX;
    pointer.y = pointerEvent.offsetY;

    pointerEvent.preventDefault();
  };

  private onPointerCancel = (pointerEvent: PointerEvent) => {
    this.pointers.delete(pointerEvent.pointerId);

    pointerEvent.preventDefault();
  };

  private getPointer(pointerEvent: PointerEvent): Pointer {
    let pointer = this.pointers.get(pointerEvent.pointerId);
    if (!pointer) {
      pointer = {
        startX: pointerEvent.x,
        startY: pointerEvent.y,
        x: pointerEvent.x,
        y: pointerEvent.y,
        force: pointerEvent.pressure,
        id: pointerEvent.pointerId,
        buttons: pointerEvent.buttons,
      };
      this.pointers.set(pointerEvent.pointerId, pointer);
    }

    console.log(this.pointers);

    return pointer;
  }
}
