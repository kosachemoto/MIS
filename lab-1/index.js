'use strict';

const flowOfCustomers  = 1.5; // Поток покупателей ( чел. / мин. )
const serviceTime = 2; // Среднее время обслуживание клиента ( чел. / мин. )

function getFlowIntencity(serviceTime) {
  return 1 / serviceTime;
}

function getUtilizationRateOfQS(flowOfCustores, flowIntencity) {
  return flowOfCustores / flowIntencity;
}

const flowIntencity = getFlowIntencity(serviceTime);
const utilizationRateOfQS = getUtilizationRateOfQS(flowOfCustomers, flowIntencity);

console.log('# LAB-1');
console.log('Интенсивность потока покупателей ( в минуту ): ' + flowIntencity);
console.log('Коэффициент использования СМО: ' + utilizationRateOfQS);