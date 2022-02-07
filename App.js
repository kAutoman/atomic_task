import React from 'react'
import { LogBox, Platform, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './src/navigation'
import { COLOR } from './src/constants'
import { store, persistor } from './src/redux/Store'
import { LinearGradient } from 'expo-linear-gradient'
import { extendTheme, NativeBaseProvider } from "native-base"


LogBox.ignoreLogs([`Setting a timer`, `Unexpected HTTP code Response`, `Can't perform a React`, `source.uri should`, `Node of type`, `Image URL`, `Please pass alt`, `VirtualizedLists should`, `The contrast ratio of`, `Online fetched source`, `interpolate() was renamed`])

const theme = extendTheme({
  components: {
    Select: {
      baseStyle: { color: COLOR.white },
      defaultProps: {},
      variants: {},
      sizes: {},
    },
  }
})

const config = {
  dependencies: { 'linear-gradient': LinearGradient }
}

const App = () => {
  return (
    <NativeBaseProvider config={config} theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Navigation />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  )
}

export default App