import { StyleSheet } from "react-native";
import { AppStyles } from "../../themes";

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: AppStyles.colorSet.black,
        marginBottom: 6,
    },
    dropdown: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: AppStyles.colorSet.white,
    },
    placeholderStyle: {
        fontSize: 14,
        color: AppStyles.colorSet.gray,
    },
    selectedTextStyle: {
        fontSize: 14,
        color: AppStyles.colorSet.black,
    },
    itemTextStyle: {
        fontSize: 14,
        color: AppStyles.colorSet.black,
    },
    errorText: {
        color: AppStyles.colorSet.red,
        fontSize: 12,
        marginTop: 4,
    },
});
export default styles;