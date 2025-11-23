import { StyleSheet } from 'react-native';
import { Colors } from '../constants/color';
import type { Theme } from '../context/ThemeProvider'; 

export const createStyles = (theme: Theme) => {
  const colors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 16,
      color: colors.text,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      padding: 10,
      borderRadius: 8,
      backgroundColor: colors.button,
      margin: 10
    },
    buttonText: {
      color: colors.buttonText,
    },
    input: {
      height: 40,
      marginTop: 12,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.text,
      backgroundColor: colors.input,
      color: colors.text,
      width: '80%'
    },
    form: {
      backgroundColor: colors.header,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'silver',
      padding: 10
    },
    selectListContainer: {
      width: '100%',
      marginTop: 12,
    },
    selectListBox: {
      borderWidth: 1,
      borderColor: colors.text,
      backgroundColor: colors.input,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    selectListText: {
      color: colors.text,
      fontSize: 16,
    },
    selectListDropdown: {
      backgroundColor: colors.header,
      borderWidth: 1,
      borderColor: 'silver',
      borderRadius: 5,
      paddingVertical: 8,
    },
    selectListItem: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    selectListItemText: {
      fontSize: 16,
      color: colors.text,
    },
    card: {
      backgroundColor: colors.button,
      borderRadius: 12,
      margin: 5,
      width: 170,
      height: 200,
      overflow: "hidden",
    },
    tag: {
      paddingVertical: 3,
      paddingHorizontal: 2,
      backgroundColor: colors.input,              
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.text + '40', 
      textAlign: 'center',
      fontSize: 12,
      margin: 2
    },
  });
};