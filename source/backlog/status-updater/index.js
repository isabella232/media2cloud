// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const {
  BacklogJob,
} = require('service-backlog-lib');
const CloudWatchStatus = require('./lib/cloudwatch');
const SnsStatus = require('./lib/sns');

/**
 * @exports handler
 */
exports.handler = async (event, context) => {
  console.log(`event = ${JSON.stringify(event, null, 2)};\ncontext = ${JSON.stringify(context, null, 2)};`);
  try {
    const topic = (new BacklogJob()).getServiceTopic();
    let instance;
    if (event.source) {
      instance = new CloudWatchStatus(event, context);
    } else if (event.Records
      && (event.Records[0].Sns || {}).TopicArn === topic.SNSTopicArn) {
      instance = new SnsStatus(event, context);
    } else {
      throw new Error('event not supported. exiting....');
    }
    return instance.process();
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
