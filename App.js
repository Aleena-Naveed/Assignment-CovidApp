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
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "./Screens/HomeScreen";
import CountryList from "./Screens/CountryListScreen";
import CountryScreen from "./Screens/CountryScreen";
import FavList from "./Screens/FavScreen" 

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerStyle={{
        width: 200,
      }}
    >
      <Drawer.Screen
        name="Home"
        //******************************************************************************/
        component={StackNavigator}
        //******************************************************************************/
        options={{
          drawerLabel: "Home",
          drawerIcon: () => <Ionicons name="md-home" size={26} color="#8CBBF1" />,
        }}
      />
        <Drawer.Screen
          name="Countries List"
          //******************************************************************************/
          component={StackNavigator1}
          //******************************************************************************/
          // options={{
          //   drawerIcon: () => <Ionicons name="md-contacts" size={26} color="#8CBBF1" />,
          // }}
        />
        <Drawer.Screen
          name="Favourite Countries List"
          //******************************************************************************/
          component={StackNavigator2}
          //******************************************************************************/
          // options={{
          //   drawerIcon: () => <Ionicons name="md-contacts" size={26} color="#8CBBF1" />,
          // }}
        />
    </Drawer.Navigator>
  );
}
//******************************************************************************/
//******************************************************************************/
const StackNavigator=()=>{
return(
<Stack.Navigator  screenOptions={({navigation})=>({
            headerLeft:()=><Ionicons name="md-menu" 
            size={40}
            onPress={()=>navigation.openDrawer()}/>,
        })}>
        <Stack.Screen name="Home" component={HomeScreen} /> 
      </Stack.Navigator>
);
}
const StackNavigator1=()=>{
return(
<Stack.Navigator  screenOptions={({navigation})=>({
            headerLeft:()=><Ionicons name="md-menu" 
            size={40}
            onPress={()=>navigation.openDrawer()}/>,
        })}>
        <Stack.Screen name="CountriesList" component={CountryList} 
         />
        <Stack.Screen name="CountryScreen" component={CountryScreen} 
         />
      </Stack.Navigator>
);
}

const StackNavigator2=()=>{
return(
<Stack.Navigator  screenOptions={({navigation})=>({
            headerLeft:()=><Ionicons name="md-menu" 
            size={40}
            onPress={()=>navigation.openDrawer()}/>,
        })}>
        <Stack.Screen name="FavCountiesList" component={FavList} 
         />
        <Stack.Screen name="CountryScreen" component={CountryScreen} 
         />
      </Stack.Navigator>
);
}
//******************************************************************************/
//******************************************************************************/
export default function App() {
   return (
     <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

