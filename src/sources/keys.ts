class KeySource {
  private keysPressed: Set<string> = new Set();

  constructor() {
    this.start();
  }

  public start = () => {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  };

  public stop = () => {
    this.keysPressed.clear();

    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  };

  public isKeyPressed = (keyCode: string) => {
    return this.keysPressed.has(keyCode);
  };

  private onKeyDown = (keyEvent: KeyboardEvent) => {
    this.keysPressed.add(keyEvent.code);
  };

  private onKeyUp = (keyEvent: KeyboardEvent) => {
    this.keysPressed.delete(keyEvent.code);
  };
}

export const keySource = new KeySource();
