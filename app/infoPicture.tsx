import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import { ThemeContext } from '@/context/ThemeProvider'
import { createStyles } from '@/styles/createStyles'

const infoPicture = () => {
  const { id } = useLocalSearchParams();
  const [picture, setPicture] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true);

  const context = useContext(ThemeContext);
  const theme = context ? context.theme : 'light';
  const stylesTheme = createStyles(theme);
  

  const getPictureById = async (id: any) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://192.168.0.47:5092/api/Pictures/${id}`)
      setPicture(response.data)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPictureById(id);
  }, [id])
  if(!picture) return null;

  if (loading) {
    return (
      <View style={[stylesTheme.center, stylesTheme.container]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={stylesTheme.container}>
      <Image 
        source={{uri: `data:image/jpeg;base64,${picture.data}`}}
        style={styles.img}
        resizeMode='contain'
      />
      <Text style={stylesTheme.text}>
        {new Date(picture.createdAt).toLocaleString("en-US", {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </Text>
      
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={stylesTheme.text}>TAGS:  </Text>
        {picture.tags.split(',')
        .map((tag: string, index: number) => (
          <Text style={stylesTheme.tag} key={index}>{tag}</Text>
        ))}
      </View>
    </View>
  )
}

export default infoPicture

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  img: {
    width: '100%',
    height: 500
  },


})