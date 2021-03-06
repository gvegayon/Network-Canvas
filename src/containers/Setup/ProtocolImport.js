import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtocolUrlForm from './ProtocolUrlForm';
import ServerPairing from './ServerPairing';
import ServerProtocols from './ServerProtocols';
import { ServerAddressForm, DiscoveredServerList } from '../../components/Setup';
import { Button, Icon } from '../../ui/components';

/**
 * This component is the top-level interface for protocol importing, wrapping
 * dependent tasks such as server discovery and pairing.
 *
 * - A user selects (or manually enters the connection info of) an available server.
 * - If pairing is required, then the pairing form is shown.
 * - If or once a server is paired, a selectable list of protocols is shown.
 */
class ProtocolImport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedServer: null, // set when user selects/enters a server to pair with
      previousSelectedServer: null, // selectedServer clone to populate manual inputs
    };
  }

  onPairingError() {
    this.setState({
      // Make prev data available to repopulate manual form if needed
      previousSelectedServer: this.state.selectedServer,
      selectedServer: null,
    });
  }

  onPairingComplete = () => {
    this.setState({
      previousSelectedServer: null,
      selectedServer: null,
    });
  }

  pairWithServer = (server) => {
    this.setState({ selectedServer: server });
  }

  contentAreas() {
    const {
      manualEntry,
      previousSelectedServer: prev,
      selectedServer,
      showUrlForm,
    } = this.state;

    const {
      pairedServer,
    } = this.props;

    let content;
    let buttonContent = null;
    if (pairedServer) {
      content = <ServerProtocols server={pairedServer} />;
    } else if (selectedServer && selectedServer.pairingServiceUrl) {
      content = (
        <ServerPairing
          server={selectedServer}
          onComplete={this.onPairingComplete}
          onError={() => this.onPairingError()}
        />
      );
    } else if (manualEntry) {
      content = (
        <ServerAddressForm
          address={prev && prev.addresses && prev.addresses[0]}
          port={prev && prev.port}
          selectServer={this.pairWithServer}
          cancel={() => this.setState({ manualEntry: false })}
        />
      );
    } else if (showUrlForm) {
      content = (
        <ProtocolUrlForm
          onCancel={() => this.setState({ showUrlForm: false })}
        />
      );
    } else {
      content = (
        <DiscoveredServerList selectServer={this.pairWithServer} />
      );
      buttonContent = (
        <React.Fragment>
          <Button
            color="platinum"
            content="Import from URL"
            onClick={() => this.setState({ showUrlForm: true })}
          />
          <Button
            color="platinum"
            content="Enter manually"
            onClick={() => this.setState({ manualEntry: true })}
          />
        </React.Fragment>
      );
    }

    let headerContent;
    if (showUrlForm) {
      headerContent = (
        <React.Fragment>
          <h1>Fetch a protocol from another location</h1>
          <p>
            To import a protocol not on Server, enter its URL below.
          </p>
        </React.Fragment>
      );
    } else {
      headerContent = (
        <React.Fragment>
          <h1>Fetch a protocol from Server</h1>
          <p>
            To use this feature, open Server on a computer connected to the same network as
            this device.
          </p>
          <p>For information about using this feature, see our documentation.</p>
        </React.Fragment>
      );
    }

    return { buttonContent, headerContent, mainContent: content };
  }

  render() {
    const { headerContent, mainContent, buttonContent } = this.contentAreas();
    return (
      <div className="protocol-import">
        <Link to="/" className="protocol-import__close">
          <Icon name="close" />
        </Link>
        { headerContent }
        <div className="protocol-import__content">
          {mainContent}
        </div>
        <div className="protocol-import__buttons">
          {buttonContent}
        </div>
      </div>
    );
  }
}

ProtocolImport.defaultProps = {
  pairedServer: null,
};

ProtocolImport.propTypes = {
  pairedServer: PropTypes.object,
};

const mapStateToProps = state => ({
  pairedServer: state.pairedServer,
});

export default connect(mapStateToProps)(ProtocolImport);

export {
  ProtocolImport as UnconnectedProtocolImport,
};
