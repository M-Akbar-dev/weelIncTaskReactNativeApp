import { StyleSheet } from "react-native";
import { AppStyles, MetricsMod } from "../../themes";
import metrics, { MetricsHorizontal, MetricsVertical } from "../../themes/Metrics";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    color: "#000",
  },
  icon: {
    padding: 5,
  },
  error: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
});

export default styles;