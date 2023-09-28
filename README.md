<p align="center">
  <a href="https://www.medusajs.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/153162406-bf8fd16f-aa98-4604-b87b-e13ab4baf604.png" width="100" />    <img alt="Medusa" src="https://i.ibb.co/vc7ZhRn/Kafka.png" width="100" />
  </a>
</p>
<h1 align="center">
  @medusajs/event-bus-kafka
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
An open source composable commerce engine built for developers.
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://circleci.com/gh/medusajs/medusa">
    <img src="https://circleci.com/gh/medusajs/medusa.svg?style=shield" alt="Current CircleCI build status." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    <a href="https://www.producthunt.com/posts/medusa"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## Overview

Kafka Event Bus module for Medusa. When installed, the events system of Medusa is powered by BullMQ and `kafkajs`. BullMQ is responsible for the message queue and worker. `io-kafka` is the underlying Kafka client, that BullMQ connects to for events storage.

## Getting started

Install the module:

```bash
yarn add @medusajs/event-bus-kafka
```

Add the module to your `medusa-config.js`:

```js
module.exports = {
  // ...
  modules: [
    {
      resolve: "@medusajs/event-bus-kafka",
      options: {
        brokers: KAFKA_BROKERS,
        logLevel: KAFKA_LOG_LEVEL,
        retry: {
          retries: KAFKA_RETRIES,
          maxRetryTime: KAFKA_MAX_RETRY_TIME,
          initialRetryTime: KAFKA_INITIAL_RETRY_TIME,
        },
      },
    }
  ],
  // ...
}
```

## Configuration

The module can be configured with the following options:

| Option                   | Type                                  | Description                                                                                                                | Default
| ------------------------ | --------------------------------------| -------------------------------------------------------------------------------------------------------------------------- | ---------------
| `queueName`              | `string?`                             | Name of the BullMQ queue.                                                                                                  | `"events-queue"
| `queueOptions`           | `QueueOptions?`                       | Options for configuring the BullMQ queue. See BullMQ's [documentation](https://api.docs.bullmq.io/interfaces/QueueOptions.html). | `{}`
| `workerOptions`          | `WorkerOptions?`                      | Options for configuring the BullMQ worker.                                                                                  | `{}`
| `brokers`                | `string[]?`                           | An array of Kafka broker addresses.                                                                                         | `[]`
| `ssl`                    | `tls.ConnectionOptions | boolean?`     | SSL options for connecting to Kafka.                                                                                       | `false`
| `sasl`                   | `SaslOptions?`                        | Options for SASL authentication with Kafka.                                                                                  | `{}`
| `clientId`               | `string?`                             | Client identifier used for connecting to Kafka.                                                                              | `"kafka-client"`
| `connectionTimeout`      | `number?`                             | Timeout for establishing a connection to Kafka (in milliseconds).                                                            | `10000`
| `authenticationTimeout`  | `number?`                             | Timeout for authentication with Kafka (in milliseconds).                                                                    | `10000`
| `reauthenticationThreshold` | `number?`                          | Threshold for re-authentication with Kafka (in milliseconds).                                                                | `3600000`
| `requestTimeout`         | `number?`                             | Timeout for Kafka request/response operations (in milliseconds).                                                             | `30000`
| `enforceRequestTimeout`  | `boolean?`                            | Enforce request timeout, causing requests to fail if they exceed the specified timeout.                                  | `true`
| `retry`                  | `RetryOptions?`                       | Options for retrying Kafka operations.                                                                                     | `{ retries: 5 }
| `socketFactory`          | `ISocketFactory?`                     | Custom socket factory for Kafka connections.                                                                               | `undefined`
| `logLevel`               | `logLevel?`                           | Log level for Kafka-related logs.                                                                                          | `undefined`
| `logCreator`             | `logCreator?`                         | Custom log creator for Kafka-related logs.                                                                                 | `undefined`           |

**Info**: See how the options are applied in the [KafkaEventBusService](https://github.com/abdokouta/medusa-event-bus-kafka/blob/main/dist/types/event-bus-module-options.type.d.ts#L28) and [loader](https://github.com/abdokouta/medusa-event-bus-kafka/blob/main/dist/loaders/index.d.ts).

If you do not provide a `brokers` in the module options, the server will fail to start.
