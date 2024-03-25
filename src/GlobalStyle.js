import { StyleSheet,Platform } from "react-native";

export default StyleSheet.create({
    androidSafeArea: {
        flex:1,
        backgroundColor:"#fff",
        paddingTop: Platform.OS === "android" ? 25 :  0,
    }
})