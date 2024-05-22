'use strict'
const {connectToRBMQ, consumerQueue } = require('../db/init.rabbitmq');

const consumeService = {
    consumeToQueue: async (queue) => {
       try {
        const { channel, connection } = await connectToRBMQ();
        await consumerQueue({channel, queue})
       } catch (error) {
         console.error('Error comsumeToQueue', error)
       }
    }
}
module.exports = consumeService;