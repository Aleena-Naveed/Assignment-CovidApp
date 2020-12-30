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

import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryScreen from './CountryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountryList = ({ navigation }) => {
  const [getCountryList, setCountryList] = useState(null);
  var x = 0;
  var i = 1;

  useEffect(() => {
    getTotalpopulation();
  }, []);

  const getTotalpopulation = async () => {
    return await fetch(
      'https://world-population.p.rapidapi.com/allcountriesname',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '63b978786amsh7dd8c3db33bf96fp1e4b92jsncfe61f57edc0',
          'x-rapidapi-host': 'world-population.p.rapidapi.com',
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setCountryList(responseJson.body.countries);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem(
        '@storage_Key_' + data,
        JSON.stringify({ value: data })
      );
    } catch (e) {
      // saving error
      console.error(e);
    }
  };
  return(
  <View style={styles.container}>
      {getCountryList && (
        <FlatList
          data={getCountryList}
          keyExtractor={() => String(x++)}
          renderItem={({ item }) => (
            <View style={styles.listStyle}>
              <TouchableOpacity
                key={Math.random()}
                onPress={() => navigation.navigate("CountryScreen", { data: item })}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "space-between",
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "40%" }}>
                    <Text style={{ fontSize: 16 }}>{item}</Text>
                  </View>
                  <TouchableOpacity
                    style={{ width: "40%" }}
                    onPress={() => saveData(item)}
                  >
                    <Ionicons name="md-heart-empty" size="32" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
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

export default CountryList;
