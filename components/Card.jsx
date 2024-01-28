import React from "react";
import { SafeAreaView,View,FlatList,StyleSheet,Text,StatusBar, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import Collapsible from 'react-native-collapsible';
import COLORS from "../constants/colors";
import Notes from "./Notes";

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

const Card= () => {


    return(

                <View >
                    <Notes/>
                </View>

    );
};

export default Card