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
    },
    consumeToQueueSuccess: async () => {
      try {
        const { channel, connection } = await connectToRBMQ();
        const notiQueue = 'notificationQueueProcess';
        // ttl
        // const timeExpire = 15000;
        // setTimeout( () => {
        //    channel.consume(notiQueue, msg => {
        //     console.log(`Message sent successfull:: ${msg.content.toString()}`);
        //     channel.ack(msg)
        //   })
        // }, timeExpire)
       
        channel.consume(notiQueue, msg => {
          try {
            const random = Math.random();
            console.log(random);
            if(random < 0.8 ) {
              throw Error("Random too  big")
            }
            console.log(`Message sent successfull:: ${msg.content.toString()}`);
            channel.ack(msg)
          } catch (error) {
            channel.nack(msg, false, false )
          }
         
        })
       
      } catch (error) {
        console.error(error);
        throw error;
      
      }
    },
    consumeToQueueDead: async () => {
      try {
        const { channel, connection } = await connectToRBMQ();

        const notificationExchangeDLX = 'notificationExDLX';
        const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';

        const notificationHotFix ='notificationQueueHotFix';

        await channel.assertExchange(notificationExchangeDLX, 'direct', {
          durable: true
        })
        const queueResult = await channel.assertQueue(notificationHotFix, {
          exclusive: false
        })
        await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX )
        
        await channel.consume(queueResult.queue, msgFailed => {
          console.log(`This notification info hot fix:: ${msgFailed.content.toString()}`);
        }, 
        { 
          noAck: true
        })
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
}
module.exports = consumeService;