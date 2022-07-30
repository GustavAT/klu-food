import log4js from 'log4js';

const LOGGER = log4js.getLogger();

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
    LOGGER.info(`Starting worker ${this.name}`);

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
      LOGGER.error(`The worker ${this.name} has not been started yet`);

      return false;
    }

    LOGGER.info(`Stopping worker ${this.name}`);
    clearInterval(this.intervalId);

    return true;
  }

  private async execute(): Promise<void> {
    const now = new Date().getTime();
    LOGGER.info(`Start exection for worker ${this.name}`);

    try {
      await this.onExecute();

      const elapsed = new Date().getTime() - now;
      LOGGER.info(`Finish execution for worker ${this.name}, duration: ${elapsed}`);
    } catch (e: unknown) {
      const elapsed = new Date().getTime() - now;
      LOGGER.warn(`Execution failed for worker ${this.name}., duration ${elapsed}`);
      LOGGER.warn(e);

      this.onError(e);
    }
  }
}
