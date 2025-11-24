import { Pressable, StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput } from "react-native";
import Card from "../service/card"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {router, useLocalSearchParams} from "expo-router";
import { ThemeContext } from "@/context/ThemeProvider";
import { createStyles } from "@/styles/createStyles";

export default function Index() {
  const [pictures, setPictures] = useState([])
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState("");
  const [filteredPictures, setFilteredPictures] = useState([])

  const context = useContext(ThemeContext);
  const theme = context ? context.theme : 'light';
  const stylesTheme = createStyles(theme);

  const params = useLocalSearchParams();
  const [refresh, setRefresh] = useState(params.refresh);

  const getPictures = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.0.47:5092/api/Pictures");
      setPictures(response.data);
      setFilteredPictures(response.data);
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  }

  const filterPictures = () => {
    if (filter === "") {
      setFilteredPictures(pictures);
      return;
    }
    else {
      const filtered = pictures.filter( (pictures: any) => 
        pictures.tags.toLowerCase().includes(filter.toLowerCase())
      )
      setFilteredPictures(filtered);
    }
  }

  useEffect( () => {filterPictures() }, [filter])
  
  useEffect(() => {
    
    if (refresh === "1") {
      getPictures();
      setRefresh("0");
    }
  }, [refresh]);
  
  useEffect(() => { getPictures()}, [])

  if (loading) {
    return (
      <View style={[stylesTheme.center, stylesTheme.container]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    )
  }
  return (
    <View style={stylesTheme.container}>
      <TextInput style={stylesTheme.input} value={filter} onChangeText={(value) => setFilter(value)} placeholder="tags"/>
      {filteredPictures.length === 0 ? (
        <View style={stylesTheme.center}>
          <Text>No pictures found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPictures}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => {router.push(`/infoPicture?id=${item.id}`)}} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
              <Card picture={item} />
            </Pressable>
          )}
      />
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
  }
})
