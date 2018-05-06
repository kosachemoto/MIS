'use strict';

const Application = require('./Application/Application');
const Channel = require('./Channel/Channel');
const ApplicationHandler = require('./ApplicationHandler/ApplicationHandler');

// Интенсивность входного потока 
const INTENCITY_INCOMING_FLOW = 0.033; // 0.033
// Интенсивность потока обслуживания 
const INTENCITY_SERVICE_FLOW = 0.025; // 0.025
// Количество каналов
const CHANNELS_COUNT = 1; // 2 
 // Время начала моделирования 
const INITIAL_MODELING_TIME = 0;
// Время окончания моделирования 
const FINAL_MODELING_TIME = 100;

// Все-все заявки
let globalIncomingFlow = [];
// Обработчик заявок
let applicationHandler = new ApplicationHandler(CHANNELS_COUNT);

let servedApplicationsCount = 0;

function Main() {
  let arrivalTime = 0;
  let serviceTime = 0;
  
  while (arrivalTime < FINAL_MODELING_TIME) {
    arrivalTime += getExpRandom(INTENCITY_INCOMING_FLOW);
    serviceTime = getExpRandom(INTENCITY_SERVICE_FLOW);
    
    let application = new Application(arrivalTime, serviceTime);
    globalIncomingFlow.push(application);

    applicationHandler.GetRelevantChannel().AddApplication(application);
    servedApplicationsCount = ++servedApplicationsCount;

    // console.log('APPLICATION: ' + servedApplicationsCount);
    // console.log('Arrival Time: ' + application.arrivalTime);
    // console.log('Served Time: ' + application.serviceTime);
    // console.log('Service Start Time: ' + application.serviceStartTime);
    // console.log('Service End Time: ' + application.serviceEndTime);
    // console.log('Waiting Time: ' + application.waitingTime);
  }
}

Main();

console.log('Served applications count: ' + servedApplicationsCount);
console.log('Service end time: ' + applicationHandler.GetServiceEndTime());
console.log('Time in work: ' + applicationHandler.GetTimeInWork());
console.log('Time in waiting: ' + applicationHandler.GetTimeInWaiting());
console.log('Downtime: ' + applicationHandler.GetDonwtime());


function getExpRandom(lambda) {
  let subRandom = Math.random();
  return - Math.log(subRandom) / lambda;
};