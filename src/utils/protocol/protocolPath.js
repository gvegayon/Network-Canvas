/* eslint-disable global-require */

import { isString } from 'lodash';
import environments from '../environments';
import inEnvironment from '../Environment';
import { userDataPath } from '../filesystem';

const isValidProtocolName = protocolName => (isString(protocolName) && protocolName.length > 0);
const ensureArray = (filePath) => {
  if (isString(filePath)) {
    return [filePath];
  }

  return filePath;
};

const protocolPath = (environment) => {
  if (environment === environments.ELECTRON) {
    const path = require('path');

    return (protocolName, filePath = []) => {
      if (!isValidProtocolName(protocolName)) throw Error('Protocol name is not valid');
      return path.join(userDataPath(), 'protocols', protocolName, ...ensureArray(filePath));
    };
  }

  if (environment === environments.CORDOVA) {
    return (protocolName, filePath) => {
      if (!isValidProtocolName(protocolName)) throw Error('Protocol name is not valid');

      return [userDataPath(), 'protocols', protocolName].concat(ensureArray(filePath)).join('/');
    };
  }

  throw new Error('protocolPath() not specified on this platform');
};

export default inEnvironment(protocolPath);
