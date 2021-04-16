// I'm using a very simple ObserverPattern implementation to avoid
// the installation of the whole rxjs package.

export type ObserverFunction<T> = (data: T | undefined) => void;

/**
 * This class is close to the BehaviorSubject class from rxjs
 */
export class EventObserver<T> {
  private observers: ObserverFunction<T>[];
  private data?: T;

  constructor() {
    this.observers = [];
  }

  /**
   * Listen to data updates. When you subscribe, you get called immediately
   * @param fn Function to trigger on update
   */
  subscribe(fn: ObserverFunction<T>) {
    this.observers.push(fn);
    fn(this.data);
  }

  /**
   * Remove the input function from the subscriptions
   * @param fn Function to remove
   */
  unsubscribe(fn: ObserverFunction<T>) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  /**
   * Raise all subscribers
   * @param data Data to store and send to all subscriptions
   */
  broadcast(data: T) {
    this.data = data;
    this.observers.forEach((subscriber) => subscriber(data));
  }
}
