import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { account, databases } from "../contexts/appwrite";
import styles from "../Styles/styles";

export default function AddLivestockScreen({ navigation }) {
  const [animalName, setAnimalName] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [feedingSchedule, setFeedingSchedule] = useState("");
  const [production, setProduction] = useState("");

  const handleAddLivestock = async () => {
    if (!animalName || !animalType || !feedingSchedule || !production) {
      Alert.alert("Please fill out all fields.");
      return;
    }

    try {
      const user = await account.get();

      await databases.createDocument(
        "68477f10000913cc0cb7", // ✅ Your Database ID
        "6853502c0005d0f67744", // ✅ Your Livestock Collection ID
        "unique()",
        {
          name: animalName,
          animalType: animalType, // ✅ Include this field
          feedingSchedule,
          production,
          userId: user.$id,
        }
      );

      Alert.alert("Livestock Added Successfully");

      setAnimalName("");
      setAnimalType("");
      setFeedingSchedule("");
      setProduction("");

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error Adding Livestock", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Livestock</Text>

      <Text>Animal Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAnimalName}
        value={animalName}
      />

      <Text>Animal Type:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAnimalType}
        value={animalType}
      />

      <Text>Feeding Schedule:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFeedingSchedule}
        value={feedingSchedule}
      />

      <Text>Production (eggs, milk, meat):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setProduction}
        value={production}
      />

      <View style={styles.button}>
        <Button title="Add Livestock" onPress={handleAddLivestock} />
      </View>
    </View>
  );
}
