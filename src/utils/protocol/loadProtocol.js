import { readFile } from '../filesystem';
import environments from '../environments';
import inEnvironment from '../Environment';
import protocolPath from './protocolPath';
import friendlyErrorMessage from '../../utils/friendlyErrorMessage';
import { validateSchema, validateLogic, logErrors } from './validation';

const openError = friendlyErrorMessage("We couldn't open that Network Canvas protocol. Check the format, and try again.");

// Basic validation on protocol format;
// any error will halt loading and display a message to the user.
const verifyProtocol = (protocol) => {
  const schemaErrors = validateSchema(protocol);
  const logicErrors = validateLogic(protocol);

  // For now, just log failures
  logErrors(schemaErrors, 'Protocol schema errors');
  logErrors(logicErrors, 'Protocol logic errors');

  // TODO: remove assertions below once we're enforcing schema
  if (!protocol.stages || !protocol.stages.length) {
    const noStagesError = new Error('Invalid protocol');
    noStagesError.friendlyMessage = 'Invalid protocol: no stages defined';
    throw noStagesError;
  }
  if (!protocol.variableRegistry) {
    const noRegistryError = new Error('Invalid protocol');
    noRegistryError.friendlyMessage = 'Invalid protocol: missing variableRegistry';
    throw noRegistryError;
  }
  return protocol;
};

const loadProtocol = (environment) => {
  if (environment !== environments.WEB) {
    return protocolName =>
      readFile(protocolPath(protocolName, 'protocol.json'))
        .then(data => JSON.parse(data))
        .then(verifyProtocol)
        .catch(openError);
  }

  return () => Promise.reject(new Error('loadProtocol() not supported on this platform'));
};

export default inEnvironment(loadProtocol);
