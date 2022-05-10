class LocalStorageEvent {
  private events: Record<string, (() => void)[]> = {};

  addEventListener(type: string, listener: () => void) {
    this.createOrAddEvent(type, listener);
  }

  dispatchEvent(type: string) {
    const { event, is } = this.isEventEmpty(type);
    if (is) return;

    event.forEach((fn) => fn());
  }

  removeEventListener(type: string, listener: () => void) {
    const { event, is } = this.isEventEmpty(type);
    if (is) return;

    const index = event.findIndex(
      (eventListener) => eventListener.toString() === listener.toString(),
    );

    if (index === -1) return;

    event.splice(index, 1);
  }

  private createOrAddEvent(type: string, listener: () => void) {
    const { event, is } = this.isEventEmpty(type);

    if (is) {
      this.events[type] = [listener];
      return;
    }

    event.push(listener);
  }

  private isEventEmpty(type: string) {
    const event = this.events[type];

    return { is: !event || event.length === 0, event };
  }
}

export default new LocalStorageEvent();
