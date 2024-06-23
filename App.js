import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PaperProvider } from "react-native-paper";
import Splashsreen from "./src/Splashsreen";
import HomeScreen from "./src/HomeScreen";
import ListQuranScreen from "./src/Quran/ListQuranScreen";
import Show from "./src/Quran/Show";
import ShowDoa from "./src/Quran/ShowDoa";
import ShowKisah from "./src/ShowKisah";
import MenuKisah from "./src/MenuKisah";
import Tentang from "./src/Tentang";
import Kisah from "./src/Kisah";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splashscreen">
        <Stack.Screen
          name="Splashscreen"
          component={Splashsreen}
          options={{
            title: "Splashscreen",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "HomeScreen",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListQuraan"
          component={ListQuranScreen}
          options={{
            title: "ListQuraan",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShowQuran"
          component={Show}
          options={{
            title: "ShowQuran",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShowDoa"
          component={ShowDoa}
          options={{
            title: "ShowDoa",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShowKisah"
          component={ShowKisah}
          options={{
            title: "ShowKisah",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MenuKisah"
          component={MenuKisah}
          options={{
            title: "MenuKisah",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DaftarKisah"
          component={Kisah}
          options={{
            title: "DaftarKisah",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tentang"
          component={Tentang}
          options={{
            title: "Tentang",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
