import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { account, databases } from "../contexts/appwrite";
import styles from "../Styles/styles";

export default function AddPlantScreen({ navigation }) {
  const [plantName, setPlantName] = useState("");
  const [wateringSchedule, setWateringSchedule] = useState("");
  const [datePlanted, setDatePlanted] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleAddPlant = async () => {
    if (!plantName || !wateringSchedule || !datePlanted) {
      Alert.alert("Please fill out all fields.");
      return;
    }

    try {
      const user = await account.get();

      await databases.createDocument(
        "68477f10000913cc0cb7",
        "68534f880029a9215eef",
        "unique()",
        {
          name: plantName,
          wateringSchedule,
          datePlanted: datePlanted.toISOString().split("T")[0],
          userId: user.$id,
        }
      );

      Alert.alert("Plant Added Successfully");

      setPlantName("");
      setWateringSchedule("");
      setDatePlanted(new Date());

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error Adding Plant", error.message);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datePlanted;
    setShowPicker(Platform.OS === "ios");
    setDatePlanted(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Plant</Text>

      <Text>Plant Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPlantName}
        value={plantName}
      />

      <Text>Watering Schedule:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setWateringSchedule}
        value={wateringSchedule}
      />

      <Text>Date Planted:</Text>
      <TouchableOpacity
        onPress={showDatePicker}
        style={[styles.input, { justifyContent: "center" }]}
      >
        <Text>{datePlanted.toISOString().split("T")[0]}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={datePlanted}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <View style={styles.button}>
        <Button title="Add Plant" onPress={handleAddPlant} />
      </View>
    </View>
  );
}
