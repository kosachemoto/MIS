'use strict';

const Channel = require('../Channel/Channel');

class ApplicationHandler {
  constructor(channelsCount) {
    this.listOfChannels = Array(channelsCount).fill().map( () => new Channel() );
  };

  GetRelevantChannel() {
    return this.listOfChannels.reduce((previousChannel, currentChannel) => {
      if (previousChannel.serviceEndTime < currentChannel.serviceEndTime) {
        return previousChannel;
      } else {
        return currentChannel;
      }
    }, this.listOfChannels[0]);
  };

  GetServiceEndTime() {
    return this.listOfChannels.reduce((previousServiceEndTime, currentChannel) => {
      if (previousServiceEndTime > currentChannel.serviceEndTime) {
        return previousServiceEndTime;
      } else {
        return currentChannel.serviceEndTime;
      }
    }, this.listOfChannels[0].serviceEndTime);
  };

  GetWorkTime() {
    return this.listOfChannels.reduce((timeInWork, currentChannel) => {
      return timeInWork += currentChannel.GetWorkTime();
    }, 0);
  }

  GetWaitingTime() {
    return this.listOfChannels.reduce((timeInWaiting, currentChannel) => {
      return timeInWaiting += currentChannel.GetWaitingTime();
    }, 0);
  }

  GetServedApplicationsCount() {
    return this.listOfChannels.reduce((servedApplicationsCount, currentChannel) => {
      return servedApplicationsCount += currentChannel.GetServedApplicationsCount();
    }, 0);
  }

  GetAverageWaitingTime() {
    return this.GetWaitingTime() / this.GetServedApplicationsCount();
  }

  GetDonwtime() {
    return this.listOfChannels.reduce((downtime, currentChannel) => {
      return downtime += currentChannel.downtime;
    }, 0);
  }

  GetAverageDonwtime() {
    return this.GetDonwtime() / this.GetServedApplicationsCount();
  }

  GetAverageSystemSpendTime() {
    return this.listOfChannels.reduce((averageSystemSpendTime, currentChannel) => {
      return averageSystemSpendTime += currentChannel.GetSystemSpendTime();
    }, 0);
  }

  GetUseRage() {
    return this.GetWorkTime() / this.GetServiceEndTime() / this.listOfChannels.length;
  }
}

module.exports = ApplicationHandler;