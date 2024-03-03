import "react-native-gesture-handler";
import { Suspense, useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SongScreen from "./screens/SongScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoadingScreen from "./components/LoadingScreen";

import Navbar from "./components/Navbar";
import { MaterialIcons } from "@expo/vector-icons";
import LoginScreen from "./screens/LoginScreen";
import EditSongScreen from "./screens/EditSong";
import { View, useColorScheme } from "react-native";
import { cacheFontsAndIcons, useTheme } from "./components/State";
import * as SystemUI from "expo-system-ui";

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadFontsAndIcons = async () => {
      await Promise.all(cacheFontsAndIcons([MaterialIcons.font]));
      setLoading(false);
    };

    preloadFontsAndIcons();
  }, []);

  useEffect(() => {
    if (theme.data) SystemUI.setBackgroundColorAsync("#0a0d0c");
    else SystemUI.setBackgroundColorAsync("#f0f4fa");
  }, [theme.data]);

  useEffect(() => {
    if (theme.state !== "loading") {
      if (theme.data === "not set")
        if (colorScheme === "light") setTheme(false);
        else setTheme(true);
      else if (theme.data !== "not set" && !loading) SplashScreen.hideAsync();
    }
  }, [theme, loading]);

  return (
    // <Suspense fallback={<View style={{ backgroundColor: "blue" }}></View>}>
    // <View style={{ flex: 1, ...themeStyle.bgColor }}>
    <Suspense
      fallback={<View style={{ flex: 1, backgroundColor: "blue" }}></View>}
    >
      <>
        <LoadingScreen />

        <NavigationContainer theme={theme.data ? DarkTheme : DefaultTheme}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: () => <Navbar />,
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ header: () => <></> }}
            />
            <Stack.Screen name="Cantare" component={SongScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="EditSong" component={EditSongScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </Suspense>
    // </View>
    // </Suspense>
  );
}
