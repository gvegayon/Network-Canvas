/* eslint-disable import/prefer-default-export */
import React from 'react';
import { has } from 'lodash';
import { Icon } from '../../ui/components';
import NameGenerator from './NameGenerator';
import NameGeneratorAutoComplete from './NameGeneratorAutoComplete';
import OrdinalBin from './OrdinalBin';
import NameGeneratorList from './NameGeneratorList';
import Sociogram from './Sociogram';
import Information from './Information';
import CategoricalBin from './CategoricalBin';
import Narrative from './Narrative';
import AlterForm from './AlterForm';
import EgoForm from './EgoForm';
import AlterEdgeForm from './AlterEdgeForm';
import FinishSession from './FinishSession';

import { StageType } from '../../protocol-consts';

const interfaces = {
  [StageType.NameGenerator]: NameGenerator,
  [StageType.NameGeneratorAutoComplete]: NameGeneratorAutoComplete,
  [StageType.NameGeneratorList]: NameGeneratorList,
  [StageType.Sociogram]: Sociogram,
  [StageType.Information]: Information,
  [StageType.OrdinalBin]: OrdinalBin,
  [StageType.CategoricalBin]: CategoricalBin,
  [StageType.Narrative]: Narrative,
  [StageType.AlterForm]: AlterForm,
  [StageType.EgoForm]: EgoForm,
  [StageType.AlterEdgeForm]: AlterEdgeForm,
  FinishSession,
};

const getInterface = (interfaceConfig) => {
  const divStyle = {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (has(interfaces, interfaceConfig)) { return interfaces[interfaceConfig]; }
  return () => (<div style={divStyle}><div style={{ textAlign: 'center' }}><Icon name="warning" /><h1 style={{ marginTop: '1rem' }}>No &quot;{interfaceConfig}&quot; interface found.</h1></div></div>);
};

export {
  NameGenerator,
  NameGeneratorAutoComplete,
  NameGeneratorList,
  Sociogram,
  Information,
  CategoricalBin,
  OrdinalBin,
  Narrative,
  AlterForm,
  EgoForm,
  AlterEdgeForm,
};

export default getInterface;
