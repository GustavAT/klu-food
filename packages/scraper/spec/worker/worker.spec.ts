import { Worker } from '../../src/worker/worker';

describe('worker', () => {
  jest.useFakeTimers();

  let executor = jest.fn();
  let worker: Worker;

  beforeEach(() => {
    executor.mockReset();
    worker = new Worker('worker', 100, executor, () => {});
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('start execution', () => {
    it('should execute after calling start', () => {
      // when
      worker.start();
      jest.advanceTimersByTime(250);

      // then
      expect(executor).toHaveBeenCalledTimes(2);
    });

    it('should not execute', () => {
      // when
      jest.advanceTimersByTime(150);

      // then
      expect(executor).toHaveBeenCalledTimes(0);
    });
  });

  describe('stop execution', () => {
    it('should stop execution after calling stop', () => {
      // given
      worker.start();
      jest.advanceTimersByTime(50);

      // when
      const stopped = worker.stop();
      jest.advanceTimersByTime(100);

      // then
      expect(executor).toHaveBeenCalledTimes(0);
      expect(stopped).toBeTruthy();
    });

    it('should not stop the timer if not started', () => {
      // when
      const stopped = worker.stop();

      // then
      expect(stopped).toBeFalsy();
    });
  });
});
