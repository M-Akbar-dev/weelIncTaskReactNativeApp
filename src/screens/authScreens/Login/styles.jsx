import { Platform, StyleSheet } from "react-native";
import { AppStyles, MetricsMod } from "../../../themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        backgroundColor:AppStyles.colorSet.white,
     
      },
      title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
        // Set title color to white for contrast
        color: AppStyles.colorSet.white, 
      },
      subtitle:{
        fontSize: 16,
        textAlign: "center",
        marginBottom: 2,
        // Set subtitle color to white for contrast
        color: AppStyles.colorSet.white,
      },
      forgotPassword: {
        // Use an accent color for the link (I'll define Accent below)
        color: AppStyles.colorSet.appBlack, 
        textAlign: "right",
        marginTop: 8,
        marginBottom: 20,
        fontSize: 14,
      },
      headerView:{
        backgroundColor: AppStyles.colorSet.primary,
        height: MetricsMod.threeFifty,
        width:"100%",
        borderBottomLeftRadius:60,
        borderBottomRightRadius:60,
      },
      logo:{
        height:100,
        width:100,
        alignSelf:"center",
        resizeMode:"contain",
        marginTop:MetricsMod.thirty,
      },
      whiteCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20, // Example padding
        margin: 10,  // Example margin
        
        // --- iOS Shadow Properties ---
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 4 }, // Shadow goes down
                shadowOpacity: 0.2, // Stronger shadow opacity
                shadowRadius: 6,    // Larger blur radius
            },
            // --- Android Shadow Property ---
            android: {
                elevation: 8, // Higher elevation creates a more noticeable shadow
                // Note: Android elevation always uses black shadow and cannot customize color
            },
        }),
    },
    dontHavetxt:{
      fontSize:16,
      alignSelf:'center',
      marginTop:MetricsMod.twenty,
      color:AppStyles.colorSet.appBlack
    },
    registerAccountTxt:{
      color:AppStyles.colorSet.appPrimaryColor
    }
    })
export default styles;