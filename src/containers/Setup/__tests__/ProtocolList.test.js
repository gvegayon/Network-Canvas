/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import ProtocolList from '../ProtocolList';

const mockProps = {
  addSession: jest.fn(),
  loadFactoryProtocol: jest.fn(),
  loadProtocol: jest.fn(),
};

const mockProtocols = [{ name: 'Sample', path: 'sample.netcanvas', isFactoryProtocol: true }];

const mockStore = () =>
  createStore(() => ({
    protocols: mockProtocols,
  }));

describe('<ProtocolList />', () => {
  it('renders ok', () => {
    const component = shallow(<ProtocolList {...mockProps} store={mockStore()} />);

    expect(component).toMatchSnapshot();
  });

  // describe('click handler', () => {
  //   let wrapper;

  //   beforeEach(() => {
  //     wrapper = shallow(<UnconnectedProtocolList {...mockProps} protocols={mockProtocols} />);
  //     mockProps.loadFactoryProtocol.mockClear();
  //     mockProps.loadProtocol.mockClear();
  //   });

  // Removed temporarily due to refactor.
  // it('loads a factory protocol', () => {
  //   wrapper.instance().onClickNewProtocol(mockProtocols[0]);
  //   expect(mockProps.loadFactoryProtocol).toHaveBeenCalled();
  // });

  // it('loads a remote protocol', () => {
  //   const protocol = { ...mockProtocols[0], isFactoryProtocol: undefined };
  //   wrapper.instance().onClickNewProtocol(protocol);
  //   expect(mockProps.loadFactoryProtocol).not.toHaveBeenCalled();
  //   expect(mockProps.loadProtocol).toHaveBeenCalledWith(protocol.path);
  // });
  // });
});
