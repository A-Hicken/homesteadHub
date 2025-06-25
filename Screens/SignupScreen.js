import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { account } from "../contexts/appwrite";
import styles from "../Styles/styles";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await account.create("unique()", email, password);
      Alert.alert("Signup Successful", "Please login now.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

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
        <Button title="Sign Up" onPress={handleSignup} />
      </View>
    </View>
  );
}
