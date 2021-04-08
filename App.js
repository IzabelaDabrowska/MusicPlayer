import * as React from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './components/SearchScreen/SearchScreen';
import ArtistScreen from './components/ArtistScreen/ArtistScreen';
import SongScreen from './components/SongScreen/SongScreen';
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const Stack = createStackNavigator();

function App() {

  let [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Abhaya-Libre': require('./assets/fonts/AbhayaLibre-ExtraBold.ttf'),
    'ABeeZee-Italic': require('./assets/fonts/ABeeZee-Italic.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
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
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
});

export default App;