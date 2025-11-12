import { JSX, useState } from "react"
import { StatusBar, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./src/redux/Store/store"
import { ThemeProvider, useTheme } from "./src/themes/ThemeProvider"
import GlobalToast from "./src/components/GlobalToast"
import GlobalLoader from "./src/components/GlobalLoader"
import RootNavigation from "./src/navigations/RootNavigation"

const AppContent = () => {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        backgroundColor={colors.statusBar}
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      <RootNavigation />
      <GlobalToast />
      <GlobalLoader />
    </SafeAreaView>
  );
};

const LoadingComponent = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <Text style={{ fontSize: 18, color: '#333' }}>Loading...</Text>
    </View>
  );
};

export default function App() {
  const body = (): JSX.Element => {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingComponent />} persistor={persistor}>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
  return body()
} 