'use strict';

class Channel {
  constructor() {
    this.incomingFlow = [];
  }

  AddApplication(application) {
    this.incomingFlow.push(application);
  }

  get lastApplication() {
    let lastItemIndex = this.incomingFlow.length - 1;
    return this.incomingFlow[lastItemIndex];
  }
}

module.exports = Channel;