interface Pointer {
  startX: number;
  startY: number;
  x: number;
  y: number;
  force: number;
  id: number;
  buttons: number;
}

class PointerSource {
  private buttonsPressed: Set<number>;
  private pointers: Map<number, Pointer>;

  constructor() {
    this.buttonsPressed = new Set();
    this.pointers = new Map();

    this.start();
  }

  public start() {
    window.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointercancel", this.onPointerCancel);
  }

  public stop() {
    window.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointercancel", this.onPointerCancel);
  }

  public isButtonPressed(button: number): boolean {
    return this.buttonsPressed.has(button);
  }

  public pointerWithin(
    within: (x: number, y: number) => boolean
  ): Pointer | undefined {
    for (const [, pointer] of this.pointers) {
      if (within(pointer.x, pointer.y)) {
        return pointer;
      }
    }

    return undefined;
  }

  private onPointerDown = (pointerEvent: PointerEvent) => {
    const pointer = this.getPointer(pointerEvent);
    this.buttonsPressed.add(pointerEvent.button);

    pointer.startX = pointerEvent.x;
    pointer.startY = pointerEvent.y;

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

    pointer.x = pointerEvent.x;
    pointer.y = pointerEvent.y;

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

export const pointerSource = new PointerSource();
