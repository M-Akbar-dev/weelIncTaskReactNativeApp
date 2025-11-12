import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
      borderRadius: 18,
      padding: 18,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
      borderLeftWidth: 4,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    time: {
      fontSize: 16,
      fontWeight: "600",
      flex: 1,
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      alignSelf: "flex-start",
    },
    badgeText: {
      fontSize: 11,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: "#000",
    },
    notes: {
      fontSize: 14,
      fontStyle: "italic",
      marginBottom: 8,
      lineHeight: 20,
    },
    ago: {
      fontSize: 12,
      textAlign: "right",
    },
    editButton: {
        marginLeft: 10,
        padding: 5,
      },
  });
  
 