import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { loadingScreenAtom, useThemeStyle } from "./State";

const LoadingScreen = () => {
  const themeStyle = useThemeStyle();
  const [loadingScreen, setLoadingScreen] = useAtom(loadingScreenAtom);

  const opacity = useSharedValue(0);

  useEffect(() => {
    if (loadingScreen.state == 1)
      opacity.value = withTiming(1, { duration: 500 });
    else if (loadingScreen.state == 2)
      opacity.value = withTiming(0, { duration: 500 }, () =>
        runOnJS(setLoadingScreen)({ state: 0, message: "" })
      );
  }, [loadingScreen]);

  return (
    <Animated.View
      style={{
        zIndex: loadingScreen.state ? 1 : -1,
        opacity,
        ...styles.loadingScreenDiv,
        ...themeStyle.bgColor,
      }}
    >
      <MaterialIcons
        name="menu-book"
        style={[themeStyle.txtColor, styles.iconStyle]}
      />
      <Text style={[themeStyle.txtColor, styles.textStyle]}>
        {loadingScreen.message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingScreenDiv: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    fontSize: 200,
  },
  textStyle: {
    fontSize: 32,
  },
});

export default LoadingScreen;
