'use strict';

const Application = require('./Application/Application');
const Channel = require('./Channel/Channel');
const ApplicationHandler = require('./ApplicationHandler/ApplicationHandler');

// Интенсивность входного потока 
const INTENCITY_INCOMING_FLOW = 0.033; // 0.033
// Интенсивность потока обслуживания 
const INTENCITY_SERVICE_FLOW = 0.025; // 0.025
// Количество каналов
const CHANNELS_COUNT = 2; 
 // Время начала моделирования 
const INITIAL_MODELING_TIME = 0;
// Время окончания моделирования 
const FINAL_MODELING_TIME = 10000;

// Все-все заявки
let globalIncomingFlow = [];

let servedApplicationsCount = 0;

function Main() {
  let arrivalTime = 0;
  let serviceTime = 0;
  
  let applicationHandler = new ApplicationHandler(CHANNELS_COUNT);
  
  while (arrivalTime < FINAL_MODELING_TIME) {
    arrivalTime += getExpRandom(INTENCITY_INCOMING_FLOW);
    serviceTime = getExpRandom(INTENCITY_SERVICE_FLOW);
    
    let application = new Application(arrivalTime, serviceTime);
    globalIncomingFlow.push(application);
    
    applicationHandler.getRelevantChannel().AddApplication(application);
    servedApplicationsCount = ++servedApplicationsCount;
  }
}

Main();

console.log('Served applications count: ' + servedApplicationsCount);

function getExpRandom(lambda) {
  let subRandom = Math.random();
  return - Math.log(subRandom) / lambda;
};