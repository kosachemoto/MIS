'use strict';

class Channel {
  constructor() {
    this.incomingFlow = [];
    this.serviceEndTime = 0;
  }

  AddApplication(application) {
    let waitingTime = this.serviceEndTime - application.arrivalTime;

    if (waitingTime > 0) {
      // Заявка ожидает, пока канал освободится
      application.waitingTime = waitingTime;
      application.serviceStartTime = this.serviceEndTime + waitingTime;
    } else {
      // Канал ожидает поступления заявки 
      application.serviceStartTime = this.serviceEndTime + Math.abs(waitingTime);
    }

    application.serviceEndTime = application.serviceStartTime + application.serviceTime;
    this.serviceEndTime = application.serviceEndTime;

    this.incomingFlow.push(application);
  }
}

module.exports = Channel;