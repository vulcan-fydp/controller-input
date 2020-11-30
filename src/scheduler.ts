import { forceUpdate } from "./api";

export abstract class Scheduler {
  private scheduled = false;

  public update(): void {
    if (!this.scheduled) {
      return;
    }

    forceUpdate();

    this.schedule();
  }

  public schedule(): void {
    this.scheduled = true;
  }

  public unschedule(): void {
    this.scheduled = false;
  }
}

export class RequestAnimationFrameScheduler extends Scheduler {
  public schedule(): void {
    super.schedule();
    window.requestAnimationFrame(() => this.update());
  }
}
