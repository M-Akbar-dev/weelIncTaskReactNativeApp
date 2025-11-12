import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    backgroundColor: "#E8F8F5",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00897B",
  },
  eventText: {
    fontSize: 14,
    color: "#4DB6AC",
  },
  menuContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});
