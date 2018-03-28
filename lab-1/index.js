'use strict';

const membersFlow  = 1.5; // Поток сотрудников ( чел. / мин. )
const servicesTime = 2; // Среднее время обслуживание сотрудника ( чел. / мин. )
const n = 2; // Каналов по умолчанию

let fact = (x) => {
  let result = 1;

  for (let i = 1; i <= x; i++) {
    result *= i;
  }

  return result;
};

// Интенсивность потока сотрудников
let getFlowIntencity = (servicesTime) => {
  return 1 / servicesTime;
};

// Коэффициент использования СМО. QS - ( Queueing System )
let getQSUtilizationRate = (membersFlow, flowIntencity, n) => {
  return membersFlow / flowIntencity / n;
};

// Минимальное число каналов для того, чтобы очередь не росла до бесконечности
let getMinN = (membersFlow, flowIntencity) => {
  let i = 0;

  while (true) {
    if (1 > getQSUtilizationRate(membersFlow, flowIntencity, i)) {
      return i;
    } else {
      i++;
    }
  }
};

// Предельная вероятность состояния n-канальной СМО
let getCriticalProbability = (QSUtilizationRate, n) => {
  let result = 0;

  for (let i = 0; i <= n; i++) {
    result += (Math.pow(QSUtilizationRate, n)) / ((n - QSUtilizationRate) * fact(n));
  }
  return Math.pow(result, -1);
};

// Вероятность нахождения в очереди k сотрудников
let getInQueueProbability = (QSUtilizationRate, k) => {
  return Math.pow(QSUtilizationRate, k) * criticalProbability / fact(k)
};

// Вероятность отказа
let getFailureProbability = (membersFlow, flowIntencity) => {
  return membersFlow / (membersFlow + flowIntencity);
};

// Относительная пропускная способность
let getRelativeBandwidth = (flowIntencity, membersFlow) => {
  return flowIntencity / (flowIntencity + membersFlow);
};

// Абсолютная пропускная способность
let getAbsoluteBandwidth = (membersFlow, relativeThroughput) => {
  return membersFlow * relativeThroughput;
};

// Среднее число сотрудников в очереди
let getInQueueMembers = (QSUtilizationRate, criticalProbability, n) => {
  return (Math.pow(QSUtilizationRate, n + 1) * criticalProbability) /
    (n * fact(n)) * Math.pow(1 - QSUtilizationRate / n, -2);
};

// Среднее число сотрудников, находящихся на обслуживании
let getInServicesMembers = (QSUtilizationRate, relativeBandwidth) => {
  return QSUtilizationRate * relativeBandwidth;
};

// Среднее число сотрудников в системе
let getInSystemMembers = (inQueueMembers, inServicesMembers) => {
  return inQueueMembers + inServicesMembers;
};

// Среднее время пребывание сотрудника в очереди
let getInQueueMembersTime = (inQueueMembers, membersFlow, relativeBandwidth) => {
  return inQueueMembers / (membersFlow * relativeBandwidth);
};

// Среднее время пребывания сотрудника в системе
let getInSystemMembersTime = (inSystemMembers, membersFlow, relativeBandwidth) => {
  return inSystemMembers / (membersFlow * relativeBandwidth);
};

console.log('# LAB-1\n');
console.log('# Начальные значения');
console.log('> Поток сотрудников ( чел. / мин. ): ', membersFlow);
console.log('> Среднее время обслуживания сотрудника ( чел. / мин. ): ', servicesTime);
console.log('> Количество каналов по умолчанию: ', n);
console.log('\n# Вычисления');

let flowIntencity = getFlowIntencity(servicesTime);
console.log('> Интенсивность потока сотрудников ( в минуту ): ' + flowIntencity);

let QSUtilizationRate = getQSUtilizationRate(membersFlow, flowIntencity, n);
console.log('> Коэффициент использования СМО ( при n = ' + n + ' ): ' + QSUtilizationRate);

let minN = getMinN(membersFlow, flowIntencity);
console.log('> Кооличество каналов, при котором очередь не будет возрастать до бесконечности: ', minN);

QSUtilizationRate = getQSUtilizationRate(membersFlow, flowIntencity, minN);
console.log('> Коэффициент использования СМО ( при n = ' + minN + ' ): ' + QSUtilizationRate);

QSUtilizationRate = getQSUtilizationRate(membersFlow, flowIntencity, 1);
let criticalProbability = getCriticalProbability(QSUtilizationRate, minN);
console.log('> Предельная вероятность: ', criticalProbability);

for (let i = 1; i <= 5; i++) {
  console.log('> Вероятность нахождения в очереди [' + i + '] сотрудников: ', getInQueueProbability(QSUtilizationRate, i));
}

let failureProbability = getFailureProbability(membersFlow, flowIntencity);
console.log('> Вероятность отказа в обслуживании сотрудника: ', failureProbability);

let relativeBandwidth = getRelativeBandwidth(flowIntencity, membersFlow);
console.log('> Относительная пропускная способность: ', relativeBandwidth);

let absoluteBandwidth = getAbsoluteBandwidth(membersFlow, relativeBandwidth);
console.log('> Абсолютная пропускная способность: ', absoluteBandwidth);

let inQueueMembers = getInQueueMembers(QSUtilizationRate, criticalProbability, minN);
console.log('> Среднее число сотрудников в очереди: ', inQueueMembers);

let inServicesMembers = getInServicesMembers(QSUtilizationRate, relativeBandwidth);
console.log('> Среднее число сотрудников, находящихся на обслуживании: ', inServicesMembers);

let inSystemMembers = getInSystemMembers(inQueueMembers, inServicesMembers);
console.log('> Среднее число сотрудников в системе: ', inSystemMembers);

let inQueueMembersTime = getInQueueMembersTime(inQueueMembers, membersFlow, relativeBandwidth);
console.log('> Среднее время пребывания сотрудника в очереди: ', inQueueMembersTime);

let inSystemMembersTime = getInSystemMembersTime(inSystemMembers, membersFlow, relativeBandwidth);
console.log('> Среднее время пребывания сотрудника в системе: ', inSystemMembersTime);
