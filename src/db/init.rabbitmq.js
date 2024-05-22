'use strict'

require('dotenv').config()
const amqp = require('amqplib');

const mq_url = process.env.CLOUD_MQ_URL;

const connectToRBMQ = async () => {
    try {
        const connection = await amqp.connect(mq_url);
        if (!connection) throw new Error('Connect to rbmq is not establish');
        const channel = await connection.createChannel();
        return { channel, connection};
    } catch (error) {
        console.error('Error connecting to RBMQ:', error);
        throw error;
    }
}

const connectToRBMQForTest = async () => {
    try {
        const {channel, connection } = connectToRBMQ();
        const queue = 'test_queue';
        const message = 'message for test'
        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(message))

        // close connection
        setTimeout(() => {
            connection.close();
        }, 2000)

    } catch (error) {
        console.error('Error connecting to RBMQ:', error);
    }
}
const consumerQueue = async ({channel, queue}) => {
    try {
        await channel.assertQueue(queue, {  durable: true});
        await channel.consume(queue, (message) => {
            console.log(`Message form queue: ${queue} -- msg: ${message.content.toString()}`);
        }, {
            noAck: true
        })
    } catch (error) {
        console.error( error);
    }
}

module.exports = {
    connectToRBMQ,
    connectToRBMQForTest,
    consumerQueue
}