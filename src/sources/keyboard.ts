import { Source } from ".";

export class KeyboardSource extends Source {
  private keysPressed: Set<string> = new Set();

  public start() {
    if (this.started) {
      return;
    }

    this.started = true;
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  public stop() {
    if (!this.started) {
      return;
    }

    this.started = false;
    this.keysPressed.clear();

    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  public isKeyPressed = (keyCode: string): boolean => {
    return this.keysPressed.has(keyCode);
  };

  private onKeyDown = (keyEvent: KeyboardEvent) => {
    this.keysPressed.add(keyEvent.code);
  };

  private onKeyUp = (keyEvent: KeyboardEvent) => {
    this.keysPressed.delete(keyEvent.code);
  };
}
