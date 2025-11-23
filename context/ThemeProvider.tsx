import { View, Text, useColorScheme } from 'react-native'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (newTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({children}: PropsWithChildren<{}>) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(colorScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    const getThemeFromStorage = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme')
        if (savedTheme === 'light' || savedTheme === 'dark') 
          setTheme(savedTheme);
      }
      catch (error) {
        console.log('Error fetching theme from storage:', error);
      }
    }
    getThemeFromStorage();
  }, [])

  useEffect(() => {
    if (colorScheme === 'dark' || colorScheme === 'light')
      setTheme(colorScheme);
  }, [colorScheme])

  const toggleTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;