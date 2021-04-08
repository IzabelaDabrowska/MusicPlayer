import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './components/SearchScreen/SearchScreen';
import ArtistScreen from './components/ArtistScreen/ArtistScreen';
import SongScreen from './components/SongScreen/SongScreen';
import { Entypo } from '@expo/vector-icons'; 

const Stack = createStackNavigator();

function StackNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={'Search'} 
        component={SearchScreen} 
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'transparent',
          }
        }}
      />
      <Stack.Screen 
        name="ArtistScreen" 
        component={ArtistScreen} 
        options={{
          headerTransparent: true,
          headerTitle: false,
          headerBackTitleVisible: false,
          headerTintColor: '#ffffff',
          cardStyle: {
            backgroundColor: 'transparent',
          }
        }}
      />
      <Stack.Screen 
        name="SongScreen" 
        component={SongScreen} 
        options={{
          headerRight: () => (
            <Entypo name='dots-three-vertical' size={22} color='#ffffff' style={{paddingRight: 10}} />
          ),
          headerTransparent: true,
          headerTitle: false,
          headerBackTitleVisible: false,
          headerTintColor: '#ffffff',
          cardStyle: {
            backgroundColor: 'transparent',
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator;