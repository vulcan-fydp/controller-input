export abstract class Source {
  protected started = false;

  abstract start(): void;

  abstract stop(): void;
}
