import { StyleSheet } from "react-native";
import { AppStyles } from "../../themes";


export const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: AppStyles.colorSet.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 140,
  },
  userName: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#d1f7d1',
  },
});
