import { StyleSheet } from "react-native";
import { AppStyles } from "../../../themes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colorSet.white,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: AppStyles.colorSet.black,
  },
  subTitle: {
    fontSize: 14,
    color: AppStyles.colorSet.gray,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: AppStyles.colorSet.primary,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: AppStyles.colorSet.gray,
  },
  value: {
    fontSize: 14,
    color: AppStyles.colorSet.black,
  },
  errorText: {
    textAlign: "center",
    marginTop: 40,
    color: AppStyles.colorSet.red,
  },
});

export default styles;
