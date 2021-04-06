import React from "react";
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function SongScreen({ route }) {
  const { songId } = route.params;

  return (
    <View style={styles.containerWrapper}>
      <Text style={styles.showText}>{songId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerWrapper: {
    width: width,
    height: height,
    paddingVertical: 45,
    backgroundColor: '#151520',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showText: {
    color: '#ffffff',
    fontSize: 20,
  }
});

export default SongScreen;