import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type HomeParamList = {
  HomeOne: undefined;
  HomeTwo: undefined;
  HomeThree: undefined;
};

export type HomeParamProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
