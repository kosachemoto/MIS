'use strict';
const Channel = require('./Channel/Channel');
const Application = require('./Application/Application');

// Интенсивность входного потока 
const INTENCITY_INCOMING_FLOW = 0.033;
// Интенсивность потока обслуживания 
const INTENCITY_SERVICE_FLOW = 0.025; 
// Количество каналов
const CHANNELS_COUNT = 2; 
 // Время начала моделирования 
const INITIAL_MODELING_TIME = 0;
 // Время окончания моделирования 
const FINAL_MODELING_TIME = 100;

// Все-все заявки
 let globalIncomingFlow = [];

let ApplicationHandler = (channel, application) => {
  let lastChannelApplication = channel.lastApplication;

  if (lastChannelApplication == undefined) {
    application.SetServiceStartTime(application.arrivalTime);
    application.SetServiceEndTime();
    
    channel.AddApplication(application);
  } else {
    let lastApplicationServiceEndTime = lastChannelApplication.serviceEndTime;
    
    application.SetServiceStartTime(lastApplicationServiceEndTime);
    application.SetServiceEndTime();
    application.SetWaitingTime(lastApplicationServiceEndTime);

    channel.AddApplication(application)
  }
  
  console.log('last channel application');
  // console.log(lastChannelApplication);
}

let Main = () => {
  let arrivalTime = 0;
  let serviceTime = 0;
  let channel = new Channel();

  while (arrivalTime < FINAL_MODELING_TIME) {
    arrivalTime += getExpRandom(INTENCITY_INCOMING_FLOW);
    serviceTime = getExpRandom(INTENCITY_SERVICE_FLOW);

    let application = new Application(arrivalTime, serviceTime);
    globalIncomingFlow.push(application);

    ApplicationHandler(channel, application);
  }

  console.log(channel);
  // console.log(globalIncomingFlow);
}

let getExpRandom = (lambda) => {
  let subRandom = Math.random();
  return - Math.log(subRandom) / lambda;
};

Main();