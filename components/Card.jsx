import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Axios, note_endpoints } from "../constants/axios";
import Notes from "./Notes";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function Card({ toggleFav, toggleCat }) {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [onlyFav, setOnlyFav] = useState(false);
  const [token, setToken] = useState("");
  const isFocused = useIsFocused();

  const getToken = async () => {
    await AsyncStorage.getItem("token").then((token) => {
      console.log(token);
      setToken(token);
      getNotes(token);
      console.log(toggleCat);
    });
  };

  const getNotes = async (token) => {
    try {
      console.log(`token: ${token}`);
      const response = await Axios.get(note_endpoints.getNotes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let notes = response.data.notes;
      notes = notes.sort((a, b) => a.priority - b.priority);
      if (toggleCat) {
        notes = notes.filter((note) => note.category.includes(toggleCat));
      }
      if (toggleFav) {
        notes = notes.filter((note) => note.favorite === true);
      }
      setNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await Axios.delete(note_endpoints.delete + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const favoriteNotes = notes.filter((note) => note.favorite === true);
  const categoryNotes = notes.filter((note) =>
    note.category.includes(toggleCat)
  );

  useEffect(() => {
    if (isFocused) {
      getToken();
      // console.log(notes);
    }
    console.log("test");
    console.log(categoryNotes);
  }, [isFocused]);

  // useEffect(() => {
  //   getNotes(token);
  //   setNotes(categoryNotes);
  // }, [toggleCat]);

  useEffect(() => {
    getNotes(token);
  }, [toggleCat, token, toggleFav]);

  return (
    <View>
      {toggleFav === false
        ? notes.map((faq) => (
            <Notes
              key={faq._id}
              title={faq.title}
              details={faq.description}
              categoria={faq.category}
              priority={faq.priority}
              id={faq._id}
              fav={faq.favorite}
              onDelete={deleteNote}
            />
          ))
        : favoriteNotes.map((faq) => (
            <Notes
              key={faq._id}
              title={faq.title}
              details={faq.description}
              categoria={faq.category}
              importancia={faq.priority}
              id={faq._id}
              fav={faq.favorite}
              onDelete={deleteNote}
            />
          ))}
    </View>
  );
}
