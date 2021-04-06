import React, {useState, useEffect} from "react";
import { View, StyleSheet, FlatList, Button, TextInput, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

let customFonts = {
  'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
};

function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    if (query === "") {
      return;
    }
    fetchSearch();
  },[query])

  const fetchSearch = () => {
    let artists = [];
    let songs = [];
    fetch(`https://genius.p.rapidapi.com/search?q=${query}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "27595eae91mshede4da0832066b8p162e0ajsn0420de00fe20",
        "x-rapidapi-host": "genius.p.rapidapi.com"
      }
    })
    .then(response => response.json()).then(json => {
      Array.prototype.forEach.call(json.response.hits,(el) => {
        songs.push({id:el.result.id, name:el.result.title, type:'song'});
      
        // add artist to the list if it's not already in there
        if (artists.filter(e => e.id === el.result.primary_artist.id).length === 0) {
          artists.push({id:el.result.primary_artist.id, name:el.result.primary_artist.name, type:'artist'});
        }
      })
      const combined = artists.concat(songs);
      setSearchList(combined);
    })
    .catch(err => {
      console.error(err);
    });
  }

  const navigateToScreen = (item) => {
    if (item.type === 'artist') {
      navigation.navigate('ArtistScreen', {
        artistId: item.id,
      })
      return;
    } 
    navigation.navigate('SongScreen', {
      songId: item.id,
    })
  }

  const ItemView = ({ item }) => {
    return (
      <Button 
        style={styles.itemStyle}
        title={item.name}
        color='#ffffff'
        onPress={() => navigateToScreen(item)}
      >
      </Button>
    );
  };
  let [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
    <View style={styles.containerWrapper}>
      <TextInput style={styles.searchInput} placeholder={'Search...'} placeholderTextColor="#ffffff" onChangeText={setQuery}/>
      <View style={styles.listWrapper}>
        <FlatList data={searchList} renderItem={ItemView} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
    )
  }
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
  searchInput: {
    fontFamily: 'Roboto-Regular',
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 13,
    color: '#ffffff',
    width: 278,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 29,
    fontSize: 24,
    letterSpacing: 0.03,
  },
  listWrapper: {
    paddingTop: 28,
  },
  itemStyle: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 58,
    fontFamily: 'Roboto-Black',
  },
});

export default SearchScreen;