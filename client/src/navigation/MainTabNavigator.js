import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import UserProfileScreen from '../screens/UserProfileScreen';
import ListScreen from '../screens/ListScreen';
import NewPostScreen from '../screens/NewPostScreen';
import MessageScreen from '../screens/MessageScreen';
import MapScreen from '../screens/MapScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const UserProfileStack = createStackNavigator(
  {
    Home: UserProfileScreen,
  },
  config,
);

UserProfileStack.navigationOptions = {
  tabBarLabel: 'User Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person${focused ? '' : '-outline'}`
          : 'md-person'
      }
    />
  ),
};

UserProfileStack.path = '';

const ListStack = createStackNavigator(
  {
    List: ListScreen,
  },
  config,
);

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

ListStack.path = '';

const NewPostStack = createStackNavigator(
  {
    NewPost: NewPostScreen,
  },
  config,
);

NewPostStack.navigationOptions = {
  tabBarLabel: 'New Post',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
    />
  ),
};

NewPostStack.path = '';

const MessageStack = createStackNavigator(
  {
    Message: MessageScreen,
  },
  config,
);

MessageStack.navigationOptions = {
  tabBarLabel: 'Message',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'}
    />
  ),
};

MessageStack.path = '';

const MapStack = createStackNavigator(
  {
    Map: MapScreen,
  },
  config,
);

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

MapStack.path = '';

const tabNavigator = createBottomTabNavigator({
  UserProfileStack,
  ListStack,
  NewPostStack,
  MessageStack,
  MapStack,
});

tabNavigator.path = '';

export default tabNavigator;
