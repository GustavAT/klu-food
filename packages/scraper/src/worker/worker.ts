import log4js from 'log4js';

const LOGGER = log4js.getLogger('worker');

/**
 * A simple worker implementation that executes a given function in a given interval.
 * Supports logging and error handling.
 */
export class Worker {
  private intervalId: NodeJS.Timer | undefined = undefined;

  constructor(
    private readonly name: string,
    private readonly interval: number,
    private readonly onExecute: () => Promise<void>,
    private readonly onError: (error: unknown) => void,
  ) {}

  /**
   * Starts the worker
   */
  start(): void {
    LOGGER.info(`Starting ${this.name}`);

    this.intervalId = setInterval(() => {
      this.execute();
    }, this.interval);
  }

  /**
   * Stops the worker
   * @returns true if the worker has been stopped, false if the worker has never been started.
   */
  stop(): boolean {
    if (this.intervalId === undefined) {
      LOGGER.error(`${this.name} has not been started yet`);

      return false;
    }

    LOGGER.info(`Stopping ${this.name}`);
    clearInterval(this.intervalId);

    return true;
  }

  private async execute(): Promise<void> {
    const now = new Date().getTime();
    LOGGER.info(`Start exection for ${this.name}`);

    try {
      await this.onExecute();

      const elapsed = new Date().getTime() - now;
      LOGGER.info(`Finish execution for ${this.name}, duration: ${elapsed}`);
    } catch (e: unknown) {
      const elapsed = new Date().getTime() - now;
      LOGGER.warn(`Execution failed for ${this.name}., duration ${elapsed}`);
      LOGGER.warn(e);

      this.onError(e);
    }
  }
}
