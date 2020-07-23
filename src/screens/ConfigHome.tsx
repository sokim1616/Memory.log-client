import React from 'react';
import {ScrollView} from 'react-native';

import ConfigButton from '../components/ConfigButton';

interface ConfigHomeProps {}

const ConfigHome: React.FC<ConfigHomeProps> = ({navigation}) => {
  return (
    <ScrollView>
      <ConfigButton navigation={navigation} config="Logout" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
      <ConfigButton config="something" />
    </ScrollView>
  );
};

export default ConfigHome;
