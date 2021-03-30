/**
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
 * Licensed under the Amazon Software License  http://aws.amazon.com/asl/
 */
const {
  CommonUtils,
} = require('core-lib');
const BaseProvider = require('./baseProvider');

class DefaultProvider extends BaseProvider {
  static isSupported(data) {
    return (data || {}).collectionUuid;
  }

  parse() {
    this.collectionUuid = this.data.collectionUuid;
    this.files = this.data.files.map(x => ({
      uuid: x.uuid || CommonUtils.uuid4(),
      key: x.location,
      md5: (x.checksums || []).filter(x0 => x0.type.toLowerCase() === 'md5').shift().value,
    }));
  }

  get attributes() {
    return {
      collectionUuid: this.collectionUuid,
    };
  }
}

module.exports = DefaultProvider;
