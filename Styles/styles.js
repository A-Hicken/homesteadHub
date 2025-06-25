import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // General Layout
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  listContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },

  // Titles
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e8b57",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
    color: "#333",
  },

  // Input Fields
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  // Buttons
  button: {
    marginTop: 30,
    marginBottom: 50,
    width: "60%",
    alignSelf: "center",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },

  // List Items
  listItem: {
    padding: 15,
    backgroundColor: "#e0f7fa",
    marginBottom: 10,
    borderRadius: 5,
  },
  listItemText: {
    fontSize: 18,
  },
});
