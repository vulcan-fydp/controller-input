interface Pointer {
  startX: number;
  startY: number;
  x: number;
  y: number;
  force: number;
}

class PointerSource {
  private buttonsPressed: Set<number>;
  // private pointersById: Map<PointerEvent["pointerId"], Pointer>;
  // private pointersByOwner: Map<number, Pointer>;

  constructor() {
    this.buttonsPressed = new Set();

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

  private onPointerDown = (pointerEvent: PointerEvent) => {
    this.buttonsPressed.add(pointerEvent.button);
  };

  private onPointerUp = (pointerEvent: PointerEvent) => {
    this.buttonsPressed.delete(pointerEvent.button);
  };

  private onPointerMove = (pointerEvent: PointerEvent) => {};

  private onPointerCancel = (pointerEvent: PointerEvent) => {};
}

export const pointerSource = new PointerSource();
