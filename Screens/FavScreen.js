import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FavList({ navigation, route }) {
  var i = 1;
  const [getdataSource, setdataSource] = useState(null);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("Keys" + keys);
      var list = [];
      for (let i = 0; i < keys.length; i++) {
        var value = await AsyncStorage.getItem(keys[i]);
        const cont = JSON.parse(value).value;
        console.log(cont);
        if (value !== null) {
          list.push(cont);
        }
      }
      setdataSource(list);
      console.log(getdataSource);
    } catch (e) {
      console.error(e);
    }
  };

  const saveData = async (key) => {
    try {
      await AsyncStorage.removeItem("@storage_Key_" + key);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {getdataSource && (
        <FlatList
          data={getdataSource}
          keyExtractor={() => String(i++)}
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
                  }}
                >
                  <View style={{ width: "40%" }}>
                    <Text>{item}</Text>
                  </View>
                  <TouchableOpacity
                    style={{ width: "40%" }}
                    onPress={() => saveData(item)}
                  >
                    <Ionicons name="md-heart" size="32" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listStyle: {
    padding: 15,
    margin: 5,
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default FavList;