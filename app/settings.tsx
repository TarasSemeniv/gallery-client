import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeProvider'
import { createStyles} from '@/styles/createStyles'

const settings = () => {
  const context = useContext(ThemeContext);
  if (!context) { return null; }
  
  const { theme, toggleTheme } = context;
  const stylesTheme = createStyles(theme)
  const handleToggleTheme = () => {
    const newTheme = theme == 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
  }


  return (
    <View style={[stylesTheme.container]}>
      <Pressable style={stylesTheme.button} onPress={handleToggleTheme}>
        <Text style={stylesTheme.buttonText}>Change theme</Text>
        {theme == 'light' ?
          <Ionicons name='sunny' size={24} color={'yellow'}/> :
          <Ionicons name='moon' size={24} color={'orange'}/>}
      </Pressable>
    </View>
  )
}

export default settings

const styles = StyleSheet.create({
})