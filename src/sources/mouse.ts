class MouseButtonSource {
  private mouseButtonsDown: Set<number>;

  constructor() {
    this.mouseButtonsDown = new Set();
  }

  public isMouseButtonPressed(button: number) {
    return this.mouseButtonsDown.has(button);
  }
}

export const mouseButtonSource = new MouseButtonSource();
