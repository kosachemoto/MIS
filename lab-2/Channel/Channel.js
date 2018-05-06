'use strict';

class Channel {
  constructor() {
    this.incomingFlow = [];
    this.serviceEndTime = 0;
    this.downtime = 0;
  }

  AddApplication(application) {
    let waitingTime = this.serviceEndTime - application.arrivalTime;

    if (waitingTime > 0) {
      // Заявка ожидает, пока канал освободится
      application.waitingTime = waitingTime;
      application.serviceStartTime = this.serviceEndTime + waitingTime;
    } else {
      // Канал ожидает поступления заявки 
      this.downtime += Math.abs(waitingTime);
      application.serviceStartTime = this.serviceEndTime + Math.abs(waitingTime);
    }

    application.serviceEndTime = application.serviceStartTime + application.serviceTime;
    this.serviceEndTime = application.serviceEndTime;

    this.incomingFlow.push(application);
  }

  GetTimeInWork() {
    return this.incomingFlow.reduce((timeInWork, currentApplication) => {
      return timeInWork + currentApplication.serviceTime;
    }, 0);
  }

  GetTimeInWaiting() {
    return this.incomingFlow.reduce((timeInWaiting, currentApplication) => {
      return timeInWaiting + currentApplication.waitingTime;
    }, 0);
  }
}

module.exports = Channel;