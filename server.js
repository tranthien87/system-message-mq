'use strict'

const {consumeToQueue, consumeToQueueSuccess, consumeToQueueDead} = require('./src/services/consumerQueue.service');

const queueName = 'test-queue';

// consumeToQueue(queueName).then(() => {
//     console.log('Message consumer started:::', queueName);
// }).catch(error => console.error('Error server::', error));

consumeToQueueSuccess().then(() => {
    console.log('Message consumer success  started:::');
}).catch(error => console.error('Error server::', error))



consumeToQueueDead().then(() => {
    console.log('Message consumer failed started:::');
}).catch(error => console.error('Error server::', error))