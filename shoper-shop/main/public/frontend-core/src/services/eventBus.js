class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  emit(eventName, data) {
    const listeners = this.events[eventName] || [];

    for (const listener of listeners) {
      listener(data);
    }
  }
}

export default new EventBus();
