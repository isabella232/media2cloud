/**
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
 * Licensed under the Amazon Software License  http://aws.amazon.com/asl/
 */
const AWS = require('aws-sdk');
const {
  StateData,
  Environment,
} = require('core-lib');
const BaseOp = require('./baseOp');

class IotOp extends BaseOp {
  async onGET() {
    throw new Error('IotOp.onGET not impl');
  }

  async onDELETE() {
    throw new Error('IotOp.onDELETE not impl');
  }

  async onPOST() {
    if (!this.request.cognitoIdentityId) {
      throw new Error('invalid user id');
    }

    const iot = new AWS.Iot({
      apiVersion: '2015-05-28',
    });

    const response = await iot.attachPolicy({
      policyName: Environment.Iot.PolicyName,
      target: this.request.cognitoIdentityId,
    }).promise();

    return super.onPOST(Object.assign({
      status: StateData.Statuses.Completed,
    }, response));
  }
}

module.exports = IotOp;
