'use strict';

const Channel = require('../Channel/Channel');

class ApplicationHandler {
  constructor(channelsCount) {
    this.listOfChannels = Array(channelsCount).fill().map( () => new Channel() );
  }

  getRelevantChannel() {
    return this.listOfChannels.reduce((previousChannel, currentChannel) => {
      if (previousChannel.serviceEndTime < currentChannel.serviceEndTime) {
        return previousChannel;
      } else {
        return currentChannel;
      }
    });
  }
}

module.exports = ApplicationHandler;