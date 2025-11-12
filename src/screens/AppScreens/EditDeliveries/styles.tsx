import { StyleSheet } from "react-native";
import { AppStyles } from "../../../themes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.white,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: AppStyles.colorSet.black,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: AppStyles.colorSet.gray,
    marginBottom: 6,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: AppStyles.colorSet.red,
    fontSize: 12,
    marginTop: 4,
  },
});
export default styles;
