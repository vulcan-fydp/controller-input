import { Source } from ".";

interface Pointer {
  startX: number;
  startY: number;
  x: number;
  y: number;
  force: number;
  id: number;
  down: boolean;
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

  constructor(private canvas: HTMLElement) {
    super();

    this.buttonsPressed = new Set();
    this.pointers = new Map();

    this.start();
  }

  public start(): void {
    if (this.started) {
      return;
    }

    this.started = true;

    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    this.canvas.addEventListener("pointerup", this.onPointerUp);
    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointercancel", this.onPointerCancel);
  }

  public stop(): void {
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

  public getPointerInitiallyPressedWithin(
    cx: number,
    cy: number,
    radius: number
  ): { x: number; y: number; within: boolean } | undefined {
    for (const [, pointer] of this.pointers) {
      if (
        pointer.down &&
        pointInCircle(pointer.startX, pointer.startY, cx, cy, radius)
      ) {
        if (pointInCircle(pointer.x, pointer.y, cx, cy, radius)) {
          return {
            x: (pointer.x - cx) / radius,
            y: (pointer.y - cy) / radius,
            within: true,
          };
        } else {
          const angle = Math.atan2(pointer.y - cy, pointer.x - cx);
          return {
            x: Math.cos(angle),
            y: Math.sin(angle),
            within: false,
          };
        }
      }
    }

    return undefined;
  }

  public pointerWithinAndDown(
    cx: number,
    cy: number,
    radius: number
  ): { x: number; y: number } | undefined {
    for (const [, pointer] of this.pointers) {
      if (pointer.down && pointInCircle(pointer.x, pointer.y, cx, cy, radius)) {
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

    pointer.down = true;

    pointerEvent.preventDefault();
  };

  private onPointerUp = (pointerEvent: PointerEvent) => {
    this.buttonsPressed.delete(pointerEvent.button);

    this.pointers.delete(pointerEvent.pointerId);

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
        startX: pointerEvent.offsetX,
        startY: pointerEvent.offsetY,
        x: pointerEvent.offsetX,
        y: pointerEvent.offsetY,
        force: pointerEvent.pressure,
        id: pointerEvent.pointerId,
        down: false,
      };
      this.pointers.set(pointerEvent.pointerId, pointer);
    }

    return pointer;
  }
}
