import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ThemeContext } from '@/context/ThemeProvider';
import { createStyles } from '@/styles/createStyles';

const Card = ({picture}: any) => {
    if (!picture) return null;
    const imageUri = `data:image/jpeg;base64,${picture.data}`;

    const context = useContext(ThemeContext);
    const theme = context ? context.theme : 'light';
    const stylesTheme = createStyles(theme);

    return (
        <View style={stylesTheme.card}>
            
            <Image 
                source={{ uri: imageUri }} 
                style={ styles.image}
            />
            <View style={styles.info}>
                {picture.tags
                    .split(',')
                    .slice(0, 3)
                    .map(( tag: string, index: number) => (
                      <Text key={index} style={stylesTheme.tag}>{tag}</Text>
                    ))}
                {picture.tags.split(',').length > 3 && (
                  <Text style={[stylesTheme.tag, {width: 30 }]}>...</Text>
                )}
            </View>
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 140,
  },
  info: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: "flex-start",
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
})