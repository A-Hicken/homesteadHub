import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { account } from "../contexts/appwrite";
import styles from "../Styles/styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Check if a session is already active
      const currentUser = await account.get();

      if (currentUser) {
        // A session is already active, so log out first
        await account.deleteSession("current");
      }
    } catch (error) {
      // No active session, safe to proceed
    }

    try {
      // Now safely create a new session
      await account.createEmailPasswordSession(email, password);
      Alert.alert("Login Successful");
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />

      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}
