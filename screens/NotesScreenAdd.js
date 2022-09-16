import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNewPost } from "../features/notesSlice";

export default function NotesScreenAdd() {
  const navigation = useNavigation();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteBody1, setNoteBody1] = useState("");
  const [noteBody2, setNoteBody2] = useState("");
  const dispatch = useDispatch();
  const canSave = [noteTitle, noteBody].every(Boolean);

  async function savePost() {
    if (canSave) {
      try {
        const post = {
          id: nanoid(),
          title: noteTitle,
          content: noteBody,
          reflection: noteBody1,
          feel: noteBody2,
        };
        await dispatch(addNewPost(post));
      } catch (error) {
        console.error("Failed to save the post: ", error);
      } finally {
        navigation.goBack();
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name={"arrow-left"} size={24} color={"black"} />
      </TouchableOpacity>

      <TextInput
        style={styles.noteTitle}
        placeholder={"Training Date"}
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        selectionColor={"gray"}
      />

      <Text>Training Session Details</Text>
      <TextInput
        style={styles.noteBody}
        placeholder={"Add your training session details, including load."}
        value={noteBody}
        onChangeText={(text) => setNoteBody(text)}
        selectionColor={"gray"}
        multiline={true}
      />

      <Text>My Reflection: </Text>
      <TextInput
        style={styles.noteBody1}
        placeholder={"Add your reflection for this training session"}
        value={noteBody1}
        onChangeText={(text) => setNoteBody1(text)}
        selectionColor={"gray"}
        multiline={true}
      />

    <Text>How I feel: </Text>
    <TextInput
        style={styles.noteBody2}
        placeholder={"Add your feelings for this training session"}
        value={noteBody2}
        onChangeText={(text) => setNoteBody2(text)}
        selectionColor={"gray"}
        multiline={true}
      />

      <Text>Feelings in emoji</Text>
    
   

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => await savePost()}
      >
        <Text style={styles.buttonText}>Add Note1</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    padding: 25,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 25,
  },
  noteBody: {
    fontSize: 14,
    fontWeight: "400",
  },
  noteBody1: {
    fontSize: 14,
    fontWeight: "400",
  },
  noteBody2: {
    fontSize: 14,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "green",
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
