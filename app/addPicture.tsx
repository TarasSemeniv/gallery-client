import { Alert, Pressable, StyleSheet, Text, View, Image, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {useContext, useEffect, useState} from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
//import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { ThemeContext } from '@/context/ThemeProvider';
import { createStyles } from '@/styles/createStyles';
import { router } from 'expo-router';

const addPicture = () => {
  const [file, setFile] = useState<string | null>(null);
  const [tags, setTags] = useState('');
  const [base64, setBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [listTag, setListTag] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  const context = useContext(ThemeContext);
  const theme = context ? context.theme : 'light';
  const stylesTheme = createStyles(theme);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You did not receive camera permissions');
    } else {
    const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [3, 4],
                quality: 1
          });
            // const result = await ImagePicker.launchCameraAsync({
            //     allowsEditing: true,
            //     aspect: [3, 4],
            //     quality: 1
            // });
            if (!result.canceled) {
                setFile(result.assets[0].uri);
                setError(null);
            }
        }
  };

  const makeImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You did not receive camera permissions');
    } else {
    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1
    });
    if (!result.canceled) {
        setFile(result.assets[0].uri);
        setError(null);
    }}
  };

  // const uploadImage = async () => {
  //   if (!base64) return;
  //   if (!tags && !selectedTag) return;
  //   try {
  //     const url = 'http://localhost:5092/api/Pictures';
  //     const responce = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ 
  //         tags: `${tags ? tags : selectedTag}`,
  //         data: `${base64}`,
  //         sendby: DeviceInfo.getModel(),
  //         createdat: new Date()
  //        })
  //     })
  //     const data = await responce.json();
  //     console.log(data);
  //   }
  //   catch (e) {

  //   }
  // }

  const uploadImage = async () => {
    if (!base64) return;
    if (!tags && !selectedTag) return;
    try {
      const url = 'http://192.168.0.47:5092/api/Pictures';
      const toSend = { 
          tags: `${tags ? tags : selectedTag}`,
          data: `${base64}`,
          sendby: "Unknown device",//DeviceInfo.getModel(),
          createdat: new Date()
         }
      const responce = await axios.post(url, toSend, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
      })

      setFile(null);
      setTags("");
      setSelectedTag("");
      setBase64(null);

      router.replace({ pathname: '/', params: { refresh: '1'}})
    }
    catch (e) {
      setError((e as string))
      return null
    }
  }

  const imageToBase64 = async () => {
    try {
      if (!file) return;
      fetch(file)
        .then( response => response.arrayBuffer() )
        .then( data => {
          const b64 = btoa( new Uint8Array(data).reduce( (item, byte) => item + String.fromCharCode(byte), '') );
          setBase64(b64);
        });

    }
    catch (e) {
      console.log(e);
      setError(String(e));
      return null;
    }
  }

  // const getTagList = async () => {
  //   const url = "http://localhost:5092/api/Pictures/tags";
  //   const response = await fetch(url, {method: "GET"})
  //   if (response.ok)
  //   {
  //     const data = await response.json();
  //     console.log(data);
  //     const names = data.map( (item: {tagName: string}) => item.tagName);
  //     setListTag(names)
  //   }
  //   else
  //   {
  //     console.log(response.statusText)
  //     setError(response.statusText)
  //     return null;
  //   }
  // }

  const getTagList = async () => {
    const url = "http://192.168.0.47:5092/api/Pictures/tags";
    const response = await axios.get(url, { method: "GET"});
    if (response.status == 200)
    {
      const names = response.data.map( (item: {tagName: string}) => item.tagName);
      setListTag(names)
    }
    else
    {
      console.log(response.statusText)
      setError(response.statusText)
      return null;
    }
  }


  useEffect( () => { uploadImage(); }, [base64])
  useEffect( () => { getTagList(); }, [])
  

  return (
        <View style={stylesTheme.container}>
            <Text style={styles.header}>
                Add Image:
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable style={stylesTheme.button} onPress={pickImage}>
                <Text style={stylesTheme.buttonText}>Choose Image</Text>
              </Pressable>

              <Pressable style={stylesTheme.button} onPress={makeImage}>
                  <Text style={stylesTheme.buttonText}>Make Image</Text>
              </Pressable>
            </View>
            <View style={stylesTheme.form}>
              <TextInput 
                style={[stylesTheme.input, {marginBottom: 12, width: 'auto'}]} 
                onChangeText={ (value) => {setTags(value)} } value={tags}
              />

              <SelectList
                placeholder='Select tag'
                boxStyles={stylesTheme.selectListBox}
                dropdownStyles={stylesTheme.selectListDropdown}
                dropdownItemStyles={stylesTheme.selectListItem}
                dropdownTextStyles={stylesTheme.selectListItemText}
                inputStyles={stylesTheme.selectListText}
                data={ listTag }
                search={ false }
                save='value'
                setSelected={(item:string) => setSelectedTag(item)}
              />
              <Pressable style={stylesTheme.button} onPress={ ()=>{imageToBase64()} }>
                  <Text style={stylesTheme.buttonText}>Upload Image</Text>
              </Pressable>
            </View>
            {file ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: file }} style={styles.image} />
                </View>
            ) : (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
}

export default addPicture;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    header: {
        fontSize: 20,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    errorText: {
        color: "red",
        marginTop: 16,
    },
    form: {
      backgroundColor: "#c3d5e9ff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'silver',
      padding: 10
    },
    input: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'gold',
      padding: 5,
      backgroundColor: "#c3d5e9ff"
    }
});