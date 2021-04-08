import { LinearGradient } from "expo-linear-gradient";
import React, {useState, useEffect, useRef} from "react";
import { View, StyleSheet, Dimensions, Text, FlatList, Image, ImageBackground } from 'react-native';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const halfHeight = Dimensions.get("window").height/2;

function ArtistScreen({ route }) {
  const { artistId } = route.params;
  const [artistSongs, setArtistSongs] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [artistImage, setArtistImage] = useState("");

  const fetchArtist = () => {
    fetch(`https://genius.p.rapidapi.com/artists/${artistId}/songs`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "27595eae91mshede4da0832066b8p162e0ajsn0420de00fe20",
        "x-rapidapi-host": "genius.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(json => {
      setArtistSongs(json.response.songs);
      setArtistName(json.response.songs[0].primary_artist.name);
      setArtistImage(json.response.songs[0].primary_artist.image_url);
    })
    .catch(err => {
      console.error(err);
    });
  }
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      fetchArtist();
      return;
    }
  })

  const listHeader = (artistName, artistImage) => {
    return (
      <View style={styles.headerBox}>
        <Text style={styles.artistName}>{artistName}</Text>
        <Image source={{uri:artistImage}} style={styles.artistImage}/>
      </View>
    )
  }

  const songList = ({item}) => {
    return (
      <View style={styles.songList}>
        <Image style={styles.songImg} source={{uri:item.header_image_url}}/>
        <Text style={styles.songTitle}>{(item.title)}</Text>
      </View>
    )
  }

  return (
    <View style={styles.containerWrapper}>
      <ImageBackground source={{uri:artistImage}} style={styles.backgroundImg}>
        <LinearGradient colors={['rgba(26, 23, 32, 0.77)', '#1A1720', '#1A1720']} style={styles.backgroundGradient}>
          <FlatList
            data={artistSongs}
            ListHeaderComponent={listHeader(artistName, artistImage)}
            ListHeaderComponentStyle={{marginBottom:50}}
            renderItem={songList}
            keyExtractor={(item) => item.id.toString()}
          >
          </FlatList>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#151520',
  },
  backgroundImg: {
    left: 0,
    right: 0,
    top: 0,
    height: halfHeight,
    resizeMode: 'cover'
  },
  backgroundGradient: {
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  headerBox: {
    height: halfHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  artistName: {    
    fontFamily: 'Roboto-Black',
    letterSpacing: 3,
    color: '#ffffff',
    fontSize: 64,
    lineHeight: 75,
    paddingBottom: 30,
  },
  artistImage: {
    width: 166,
    height: 166,
  },
  songList: {
    width: width,
    height: 71,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  songTitle: {
    fontFamily: 'Roboto-Italic',
    marginLeft: 15,
    color: '#ffffff',
    fontSize: 14,
  },
  songImg: {
    height: 61,
    width: 62,
  }
});

export default ArtistScreen;