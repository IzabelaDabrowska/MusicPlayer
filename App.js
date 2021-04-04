import * as React from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './components/SearchScreen/SearchScreen';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
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
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
});

export default App;