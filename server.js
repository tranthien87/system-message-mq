'use strict'

const {consumeToQueue} = require('./src/services/consumerQueue.service');

const queueName = 'test-queue';

consumeToQueue(queueName).then(() => {
    console.log('Message consumer started:::', queueName);
}).catch(error => console.error('Error server::', error))