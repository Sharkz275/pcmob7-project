import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { deletePostThunk, updatePostThunk } from "../features/notesSlice";

export default function NotesScreenDetails() {
  const route = useRoute();
  const titleInputRef = useRef();
  const navigation = useNavigation();
  const params = route.params;
  const [noteTitle, setNoteTitle] = useState(params.title);
  const [noteBody, setNoteBody] = useState(params.content);
  const [noteBody1, setNoteBody1] = useState(params.reflection);
  const [noteBody2, setNoteBody2] = useState(params.feel);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const id = params.id;

  async function updatePost(id) {
    try {
      const updatedPost = {
        id,
        title: noteTitle,
        content: noteBody,
        reflection: noteBody1,
        feel: noteBody2,
      };
      await dispatch(updatePostThunk(updatedPost));
    } catch (error) {
      console.error("Failed to update the post: ", error);
    } finally {
      navigation.goBack();
    }
  }

  async function deletePost(id) {
    try {
      await dispatch(deletePostThunk(id));
    } catch (error) {
      console.error("Failed to update the post: ", error);
    } finally {
      navigation.goBack();
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-left"} size={24} color={"black"} />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() => {
            setEditable(!editable);
            if (!editable) {
              setTimeout(() => titleInputRef.current.focus(), 100);
            } else {
              setTimeout(() => titleInputRef.current.blur(), 100);
            }
          }}
        >
          <FontAwesome
            name={"pencil"}
            size={24}
            color={editable ? "forestgreen" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => deletePost(id)} 
          style={{ marginLeft: 15 }}>
          <FontAwesome name={"trash"} size={24} color={"black"} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.noteTitle}
        placeholder={"note title"}
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        selectionColor={"gray"}
        editable={editable}
        ref={titleInputRef}
      />
      <TextInput
        style={styles.noteBody}
        placeholder={"Add your notes"}
        value={noteBody}
        onChangeText={(text) => setNoteBody(text)}
        selectionColor={"gray"}
        editable={editable}
        multiline={true}
      />
      <TextInput
        style={styles.noteBody1}
        placeholder={"Add your notes1"}
        value={noteBody1}
        onChangeText={(text) => setNoteBody1(text)}
        selectionColor={"gray"}
        editable={editable}
        multiline={true}
      />
      <TextInput
        style={styles.noteBody2}
        placeholder={"Add your notes2"}
        value={noteBody2}
        onChangeText={(text) => setNoteBody2(text)}
        selectionColor={"gray"}
        editable={editable}
        multiline={true}
      />
      <View style={{ flex: 1 }} />
      <TouchableOpacity 
        style={styles.button} 
        onPress={async () => updatePost(id)}>
        <Text style={styles.buttonText}>Save</Text>
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
    fontSize: 15,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#006d77",
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