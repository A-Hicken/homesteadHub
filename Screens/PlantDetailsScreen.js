import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { databases } from "../contexts/appwrite";

export default function PlantDetailsScreen({ route, navigation }) {
  const { plantId } = route.params;
  const [plant, setPlant] = useState(null);
  const [notes, setNotes] = useState("");
  const [wateringSchedule, setWateringSchedule] = useState("");
  const [datePlanted, setDatePlanted] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await databases.getDocument(
          "68477f10000913cc0cb7",
          "68534f880029a9215eef",
          plantId
        );
        setPlant(response);
        setNotes(response.notes || "");
        setWateringSchedule(response.wateringSchedule || "");
        setDatePlanted(response.datePlanted || "");
      } catch (error) {
        Alert.alert("Error fetching plant", error.message);
      }
    };

    fetchPlant();
  }, []);

  const handleUpdate = async () => {
    try {
      await databases.updateDocument(
        "68477f10000913cc0cb7",
        "68534f880029a9215eef",
        plantId,
        { notes, wateringSchedule, datePlanted }
      );
      Alert.alert("Plant Updated");
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Error updating plant", error.message);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this plant?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await databases.deleteDocument(
                "68477f10000913cc0cb7",
                "68534f880029a9215eef",
                plantId
              );
              Alert.alert("Plant Deleted");
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error deleting plant", error.message);
            }
          },
        },
      ]
    );
  };

  if (!plant) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{plant.name}</Text>

      <Text style={{ marginTop: 10 }}>Watering Schedule:</Text>
      <TextInput
        editable={isEditing}
        value={wateringSchedule}
        onChangeText={setWateringSchedule}
        style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
      />

      <Text>Date Planted:</Text>
      <TextInput
        editable={isEditing}
        value={datePlanted}
        onChangeText={setDatePlanted}
        placeholder="YYYY-MM-DD"
        style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
      />

      <Text>Notes:</Text>
      <TextInput
        editable={isEditing}
        value={notes}
        onChangeText={setNotes}
        style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
      />

      {isEditing ? (
        <Button title="Save Changes" onPress={handleUpdate} />
      ) : (
        <Button title="Edit Plant" onPress={() => setIsEditing(true)} />
      )}

      <View style={{ marginTop: 10 }}>
        <Button title="Delete Plant" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}
