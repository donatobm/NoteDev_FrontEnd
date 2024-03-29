import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import COLORS from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Axios, note_endpoints } from "../constants/axios";
import { useIsFocused } from "@react-navigation/native";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
  </TouchableOpacity>
);

const App = ({ setToggleCat }) => {
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState("");

  const getCategories = async (token) => {
    try {
      await Axios.get(note_endpoints.getCategories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setCategories(response.data.categories);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getToken = async () => {
    await AsyncStorage.getItem("token").then((token) => {
      setToken(token);
      getCategories(token);
    });
  };

  useEffect(() => {
    if (isFocused) {
      getToken();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => {
    const backgroundColor =
      item._id === selectedId ? COLORS.purple : COLORS.white;
    const color = item._id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          if (item._id === selectedId) {
            setSelectedId(null);
            setToggleCat(null);
          } else {
            setSelectedId(item._id);
            setToggleCat(item.name);
          }
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={true}
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: 25,
  },
  title: {
    fontSize: 12,
  },
});

export default App;
