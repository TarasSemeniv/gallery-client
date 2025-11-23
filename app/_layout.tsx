import {  Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons'
import  ThemeProvider, { ThemeContext }  from "../context/ThemeProvider";
import { useContext } from "react";
import { Colors } from "@/constants/color";

const ThemedTabs = () => {
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : 'light';
  const colorHeader = Colors[theme].header;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorHeader,
        },
        headerTintColor: theme === 'light' ? '#000' : '#fff',
        tabBarInactiveTintColor: theme === 'light' ? '#555' : '#aaa'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="addPicture"
        options={{
          title: 'Add picture',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="add" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="settings" size={size} color={color} />
        }}
      />
      <Tabs.Screen name="infoPicture" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
};


export default function RootLayout() {

  return <ThemeProvider>
    <ThemedTabs />
  </ThemeProvider>;
}
