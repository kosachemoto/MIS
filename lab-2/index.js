'use strict';

const Application = require('./Application/Application');
const Channel = require('./Channel/Channel');
const ApplicationHandler = require('./ApplicationHandler/ApplicationHandler');

// Интенсивность входного потока 
const INTENCITY_INCOMING_FLOW = 30; // 0.033
// Интенсивность потока обслуживания 
const INTENCITY_SERVICE_FLOW = 40; // 0.025
// Количество каналов
const CHANNELS_COUNT = 2; // 2 
 // Время начала моделирования 
const INITIAL_MODELING_TIME = 0;
// Время окончания моделирования 
const FINAL_MODELING_TIME = 10000;

// Все-все заявки
let globalIncomingFlow = [];
// Обработчик заявок
let applicationHandler = new ApplicationHandler(CHANNELS_COUNT);
// Общее число обработанных заявок
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
  }
}

Main();

console.log('> Served applications count: ' + servedApplicationsCount);
console.log('> Service end time: ' + applicationHandler.GetServiceEndTime() + '\n');

console.log('> Total time in work: ' + applicationHandler.GetWorkTime());
console.log('> Total waiting time: ' + applicationHandler.GetWaitingTime());
console.log('> Total downtime: ' + applicationHandler.GetDonwtime() + '\n');

console.log('> Average system spend time: ' + applicationHandler.GetAverageSystemSpendTime());
console.log('> Average waiting time: ' + applicationHandler.GetAverageWaitingTime());
console.log('> Average downtime: ' + applicationHandler.GetAverageDonwtime() + '\n');

console.log('>Use rate: ' + applicationHandler.GetUseRage());


function getExpRandom(lambda) {
  let subRandom = Math.random();
  return - Math.log(subRandom) / lambda;
};