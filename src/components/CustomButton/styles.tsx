import { StyleSheet } from "react-native";
import { MetricsMod, MetricsVertical } from "../../themes";

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        alignSelf: 'center',
        borderRadius: MetricsMod.baseMargin,
        paddingVertical: MetricsVertical.baseMargin,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 3,
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
    icon: {
        width: 20,
        height: 20,
        marginHorizontal: 8,
    },
});

export default styles;