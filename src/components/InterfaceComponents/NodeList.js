import React, { Component } from 'react';
import Node from './Node';

class NodeList extends Component {
  render() {
    const {
      network,
      label
    } = this.props;

    return (
      <div className='nodelist'>
      { network.nodes.map((node, index) => {
        return <Node key={ index } label={ label(node) } />;
      }) }
      </div>
    );
  }
}

export default NodeList;
