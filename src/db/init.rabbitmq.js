'use strict'

require('dotenv').config()
const amqp = require('amqplib');

const localUrl = process.env.LOCAL_RABBIT_URL;
const connect = amqp.connect(localUrl)