import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = () => {
  const [getState, setState] = useState();
  const [getLoading, setLoading] = useState(true);
  const [getdataSource, setdataSource] = useState(null);
  var x = 0;

  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    return await fetch('https://covid-19-data.p.rapidapi.com/totals', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '732a2643d3mshf3d16ace3a873aap16b12ajsn3c1d74acfcff',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setdataSource(responseJson);
        console.log(getdataSource);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
    <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 20, color: 'orange', fontStyle: 'italic'}}>WORLD STATISTICS</Text>
      {getdataSource && (
        <Text style={{padding: 15, color: 'white', fontStyle: 'italic'}}>
          Confirmed Cases: {getdataSource[0].confirmed}
          {'\n'}
          Recovered Cases: {getdataSource[0].recovered}
          {'\n'}
          Critical Cases: {getdataSource[0].critical}
          {'\n'}
          Last Update: {getdataSource[0].lastUpdate}
          {'\n'}
          Deaths: {getdataSource[0].deaths}
        </Text>
      //   <View>
      //   <Text style={styles.InputHeading}>Confirmed Cases</Text>
      //   <TextInput
      //     style={styles.TextInput}
      //     editable={false}
      //     value={getdataSource[0].confirmed}
      //   />
      // </View>
      )}  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black'
 //   justifyContent: 'center',
  },
});
export default HomeScreen;
