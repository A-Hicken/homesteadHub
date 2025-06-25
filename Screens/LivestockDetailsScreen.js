import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { databases } from "../contexts/appwrite";

export default function LivestockDetailsScreen({ route, navigation }) {
  const { animalId } = route.params;
  const [animal, setAnimal] = useState(null);
  const [feedingSchedule, setFeedingSchedule] = useState("");
  const [production, setProduction] = useState("");
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await databases.getDocument(
          "68477f10000913cc0cb7",
          "6853502c0005d0f67744",
          animalId
        );
        setAnimal(response);
        setFeedingSchedule(response.feedingSchedule || "");
        setProduction(response.production || "");
        setNotes(response.notes || "");
      } catch (error) {
        Alert.alert("Error fetching livestock", error.message);
      }
    };

    fetchAnimal();
  }, []);

  const handleUpdate = async () => {
    try {
      await databases.updateDocument(
        "68477f10000913cc0cb7",
        "6853502c0005d0f67744",
        animalId,
        {
          feedingSchedule,
          production,
          notes,
        }
      );
      Alert.alert("Livestock Updated");
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Error updating livestock", error.message);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this livestock?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await databases.deleteDocument(
                "68477f10000913cc0cb7",
                "6853502c0005d0f67744",
                animalId
              );
              Alert.alert("Livestock Deleted");
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error deleting livestock", error.message);
            }
          },
        },
      ]
    );
  };

  if (!animal) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{animal.name}</Text>

      <Text style={{ marginTop: 10 }}>Feeding Schedule:</Text>
      <TextInput
        editable={isEditing}
        value={feedingSchedule}
        onChangeText={setFeedingSchedule}
        style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
      />

      <Text>Production:</Text>
      <TextInput
        editable={isEditing}
        value={production}
        onChangeText={setProduction}
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
        <Button title="Edit Livestock" onPress={() => setIsEditing(true)} />
      )}

      <View style={{ marginTop: 10 }}>
        <Button title="Delete Livestock" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}
