import React, { useMemo, useState } from 'react';
import { 
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme  
} from '@react-navigation/native';
import { StatusBar, StyleSheet} from 'react-native';
import { 
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme  
} from 'react-native-paper';
import Navigation from './src/navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';



export default function App() {

  const [theme, setTheme] = useState('dark')

  PaperDefaultTheme.colors.primary = '#1ae1f2'
  PaperDarkTheme.colors.primary = '#1ae1f2'
  PaperDarkTheme.colors.accent = '#1ae1f2'

  NavigationDarkTheme.colors.background = '#192734'
  NavigationDarkTheme.colors.card = '#15212b'

  const handleTheme = () => {
    setTheme( theme === 'dark' ? 'light' : 'dark')
  }

  const preference = useMemo(() => ({
    theme,
    handleTheme    
  }), [theme])

  return (
    <PreferencesContext.Provider value={preference}>
      <PaperProvider theme={ theme === 'dark' ? PaperDarkTheme : PaperDefaultTheme }>
        <StatusBar barStyle={ theme === 'dark' ? 'light-content' : 'dark-content' } backgroundColor={theme === 'light' ? '#fff' : '#000'} />
        <NavigationContainer theme={ theme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme }>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
