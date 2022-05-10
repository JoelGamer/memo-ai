import React, { FC, useContext } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { Menu } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from './@types/navigation';
import OptionsContext from './contexts/header/optionsContext';
import ConfirmContext from './contexts/header/confirmContext';
import { CreateMemo, Home, Memo } from './pages';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Options: FC = () => {
  const { options } = useContext(OptionsContext);

  return (
    <Menu
      trigger={(triggerProps) => (
        <Pressable {...triggerProps}>
          <Icon name="dots-vertical" size={25} />
        </Pressable>
      )}>
      {options.map(({ text, onPress }, index) => (
        <Menu.Item key={index} onPress={onPress}>
          {text}
        </Menu.Item>
      ))}
    </Menu>
  );
};

const Confirm: FC = () => {
  const { onPressConfirm } = useContext(ConfirmContext);

  return (
    <TouchableOpacity onPress={onPressConfirm}>
      <Icon name="check" size={25} />
    </TouchableOpacity>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Memo"
          component={Memo}
          options={{ headerRight: () => <Options /> }}
        />
        <Stack.Screen
          name="CreateMemo"
          component={CreateMemo}
          options={{ title: 'Memo', headerRight: () => <Confirm /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
