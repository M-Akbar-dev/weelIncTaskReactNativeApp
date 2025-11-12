import { StyleSheet } from "react-native";
import { AppStyles, MetricsMod } from "../../../themes";

export const styles = StyleSheet.create({
    container :{ 
        flex:1,
        backgroundColor:AppStyles.colorSet.white,
        justifyContent:'center'
    },
    image: {
        width: MetricsMod.twoHundred,
        height: MetricsMod.twoHundred,
        resizeMode: 'cover' ,
        alignSelf:'center'
    }
})