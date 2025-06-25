import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

// Screens
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from "./Screens/HomeScreen";
import AddPlantScreen from "./Screens/AddPlantScreen";
import PlantDetailsScreen from "./Screens/PlantDetailsScreen";
import LivestockDetailsScreen from "./Screens/LivestockDetailsScreen";
import AddLivestockScreen from "./Screens/AddLivestockScreen";
import StartScreen from "./Screens/StartScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPlant" component={AddPlantScreen} />
        <Stack.Screen name="PlantDetails" component={PlantDetailsScreen} />
        <Stack.Screen name="AddLivestock" component={AddLivestockScreen} />
        <Stack.Screen
          name="LivestockDetails"
          component={LivestockDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
