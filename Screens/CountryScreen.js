 import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const CountryScreen = ({route}) => {
  const country = route.params.data;
  console.log(country);
  const [getState, setState] = useState();
  const [getLoading, setLoading] = useState(true);
  const [getdataSource, setdataSource] = useState(null);
  const [getCountry, setCountry] = useState(country);
  var x = 0;

  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    return await fetch("https://covid-19-data.p.rapidapi.com/country?name="+getCountry, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "21cce7844emsh7c29d3f7616f510p1490d3jsn77974545d56d",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
})
      .then((response) => response.json())
      .then((responseJson) => {
        setdataSource(responseJson);
        console.log(responseJson);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      {getdataSource && (
        <Text>
          confirmed cases: {JSON.stringify(getdataSource[0].confirmed)}
          {'\n'}
          Recovered Cases: {JSON.stringify(getdataSource[0].recovered)}
          {'\n'}
          Critical Cases: {JSON.stringify(getdataSource[0].critical)}
          {'\n'}
          Deaths: {JSON.stringify(getdataSource[0].deaths)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CountryScreen;
