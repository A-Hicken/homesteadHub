import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Homestead Hub!</Text>

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#2e8b57",
    textAlign: "center",
  },
  buttonContainer: {
    width: "60%",
    marginBottom: 20,
  },
});
