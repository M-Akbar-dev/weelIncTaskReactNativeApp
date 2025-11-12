import { StyleSheet } from "react-native";
import { AppStyles } from "../../../themes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.white,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: AppStyles.colorSet.black,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: AppStyles.colorSet.black,
    marginBottom: 6,
  },
  inputBox: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: AppStyles.colorSet.white,
  },
  errorText: {
    color: AppStyles.colorSet.red,
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
