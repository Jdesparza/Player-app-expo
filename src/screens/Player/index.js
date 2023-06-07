import { useState } from "react";
import { Image, Text, View, Button } from "react-native";
import BackgroundImgPlayerBlur from "../../components/BackgroundImgPlayerBlur";

const Player = () => {

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
            <BackgroundImgPlayerBlur />
        </View>
    );
}

export default Player