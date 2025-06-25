import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { account, databases } from "../contexts/appwrite";
import styles from "../Styles/styles";
import { Query } from "appwrite";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [plants, setPlants] = useState([]);
  const [livestock, setLivestock] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

  const fetchUserData = async () => {
    try {
      const user = await account.get();
      fetchPlants(user.$id);
      fetchLivestock(user.$id);
    } catch (error) {
      Alert.alert("Error fetching user", error.message);
    }
  };

  const fetchPlants = async (userId) => {
    try {
      const response = await databases.listDocuments(
        "68477f10000913cc0cb7",
        "68534f880029a9215eef",
        [Query.equal("userId", userId)]
      );
      setPlants(response.documents);
    } catch (error) {
      Alert.alert("Error fetching plants", error.message);
    }
  };

  const fetchLivestock = async (userId) => {
    try {
      const response = await databases.listDocuments(
        "68477f10000913cc0cb7",
        "6853502c0005d0f67744",
        [Query.equal("userId", userId)]
      );
      setLivestock(response.documents);
    } catch (error) {
      Alert.alert("Error fetching livestock", error.message);
    }
  };

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate("PlantDetails", { plantId: item.$id })}
    >
      <Text style={styles.listItemText}>{item.name} 💚</Text>
    </TouchableOpacity>
  );

  const renderLivestockItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate("LivestockDetails", { animalId: item.$id })
      }
    >
      <Text style={styles.listItemText}>{item.name} 🤎</Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await account.deleteSession("current");
            navigation.replace("Start");
          } catch (error) {
            Alert.alert("Error Logging Out", error.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Your Plants</Text>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.$id}
        renderItem={renderPlantItem}
        ListEmptyComponent={<Text>No plants found.</Text>}
      />

      {/* Centered Button */}
      <View style={styles.button}>
        <Button
          title="Add New Plant"
          onPress={() => navigation.navigate("AddPlant")}
        />
      </View>

      <Text style={styles.title}>Your Livestock</Text>
      <FlatList
        data={livestock}
        keyExtractor={(item) => item.$id}
        renderItem={renderLivestockItem}
        ListEmptyComponent={<Text>No livestock found.</Text>}
      />

      {/* Centered Button */}
      <View style={styles.button}>
        <Button
          title="Add New Livestock"
          onPress={() => navigation.navigate("AddLivestock")}
        />
      </View>

      {/* Logout Button */}
      <View style={[styles.button, { marginTop: 30 }]}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}
