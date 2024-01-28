import React, { useState } from "react";
import {Animated,SafeAreaView,View,FlatList,StyleSheet,Text,StatusBar, TouchableOpacity, TouchableWithoutFeedback} from "react-native";

import COLORS from "../constants/colors";
import {AntDesign} from '@expo/vector-icons'

const Notes = () => {

        const [opened, setOpened] = useState(false);
        const [animation] = useState(new Animated.Value(0));



    function toggleAccordion(){
        if(!opened){
                Animated.timing(animation,{
                    toValue:1,
                    duration:100,
                    useNativeDriver:false
                }).start()
        }else{
            Animated.timing(animation,{
                toValue:0,
                duration:100,
                useNativeDriver:false
            }).start()
        }

        setOpened(!opened)
    }

    //this is where we use the to values

    const heightAnimationInterpolation = animation.interpolate({
        inputRange:[0,1],
        outputRange:[0,100]
    })

    return(

        <View style={style.container}>
            <TouchableWithoutFeedback onPress={toggleAccordion}>
                <View style={style.header}>
                    <Text >title</Text>
                        <AntDesign name={opened?'caretup':'caretdown'} size={16}/>
                </View>
            </TouchableWithoutFeedback>

            <Animated.View  style={[style.content,{height:heightAnimationInterpolation}]}>
                    <Text style={style.details}> content</Text>
            </Animated.View>

        </View>

    );
};

export default Notes

const style = StyleSheet.create({
    content:{
        marginTop:8,
    },

    container:{
        margin:10,
        padding:15,
        backgroundColor: COLORS.light_orange,
        borderRadius:6,
    },

    header:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
});