import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { useSelector } from "react-redux";
  import { useNavigation } from "@react-navigation/native";
  import { NOTES_SCREEN } from "../constants";

  const posts = [
    {
      id: 1,
      title: "Add NotesScreenHome.js file",
      content: "Make sure you don't have any errors when copying this code",
    },
  ];
  
  export default function NotesScreenHome() {
    const posts = useSelector((state) => state.notes);
    const navigation = useNavigation ();
    function renderItem({ item }) {
      return (
        <TouchableOpacity style={styles.noteCard} onPress={() => {}}>
          <Text style={styles.noteCardTitle}>{item.title}</Text>
          <Text style={styles.noteCardBodyText}>
            {item.content.substring(0, 120)}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>notes</Text>
  
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(post) => post.id.toString()}
        />
  
        <View style={{ flex: 1 }} />
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate(NOTES_SCREEN.Add)}>
          <Text style={styles.buttonText}>Add Training Session</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    noteCard: {
      borderColor: "gray",
      borderWidth: 1,
      padding: 15,
      borderRadius: 5,
      marginBottom: 15,
    },
    noteCardTitle: {
      fontSize: 13,
      fontWeight: "500",
      marginBottom: 7,
    },
    noteCardBodyText: {
      fontSize: 12,
      fontWeight: "300",
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: 100,
      padding: 25,
    },
    title: {
      fontWeight: "bold",
      fontSize: 40,
      marginBottom: 20,
    },
    button: {
      backgroundColor: "green",
      borderRadius: 15,
      width: "100%",
    },
    buttonText: {
      textAlign: "center",
      fontWeight: "400",
      fontSize: 16,
      padding: 20,
      color: "white",
    },
  });