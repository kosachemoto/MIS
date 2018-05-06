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

  GetTimeInWork() {
    return this.listOfChannels.reduce((timeInWork, currentChannel) => {
      return timeInWork += currentChannel.GetTimeInWork();
    }, 0);
  }

  GetTimeInWaiting() {
    return this.listOfChannels.reduce((timeInWaiting, currentChannel) => {
      return timeInWaiting += currentChannel.GetTimeInWaiting();
    }, 0);
  }

  GetDonwtime() {
    return this.listOfChannels.reduce((downtime, currentChannel) => {
      return downtime += currentChannel.downtime;
    }, 0);
  }
}

module.exports = ApplicationHandler;