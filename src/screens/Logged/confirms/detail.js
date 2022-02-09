import React, { useState } from 'react'
import { Text, Stack, Button, Box, Image, useToast, HStack, View } from 'native-base'
import { db, Images, ROOT, Styles } from '../../../constants'
import { TouchableOpacity,StyleSheet, SafeAreaView,FlatList } from 'react-native'
import { Loading } from '../../../components';
import { Video } from 'expo-av';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
    container: {
      display:"flex",
      flexWrap:"wrap",
      marginTop:10,
    }
  });

const HomeCardDetail = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const CardItem = navigation.state.params;
    const renderImages = () => {
        var result = [];
        if (!CardItem.repeatState) {
            result = (CardItem.type === "video" ?
            <Video
                style={{ height: 280, marginBottom: 20, alignSelf: "center", width: "80%", maxWidth: "80%" }}
                source={{ uri: `${ROOT.PAYMENT_URL}img/${CardItem.photo}` }}
                useNativeControls
                resizeMode="contain"
                isLooping
            /> :
            <Image size="100%" style={{marginTop:0}} height={250} source={{ uri: `${ROOT.PAYMENT_URL}img/${CardItem.photo[0]}` }} resizeMode="contain" alignSelf="center" />)
        }
        else {
            for(let temp of CardItem.photo){
                
                result.push(CardItem.type === "video" ?
                <Video
                    style={{ height: 280, marginBottom: 20, alignSelf: "center", width: "80%", maxWidth: "80%" }}
                    source={{ uri: `${ROOT.PAYMENT_URL}img/${CardItem.photo}` }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                /> :
                <Image width={255} height={255} style={{margin:0}} key={temp} source={{ uri: `${ROOT.PAYMENT_URL}img/${temp}` }} resizeMode="contain" alignSelf="center" />)
            }   
           
        }
        
        return result;
       
    }
    return (
        <Stack
            flex={1}
            bg={"#fff"}
            pt={20}
        >
            {loading && <Loading />}
            <Box pos="absolute" zIndex={10} top={12} left={7}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.GobackImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box>
            
            <Text color="#000" fontSize="50px" textAlign="center">{user.name}</Text>
            <Text color="#000" fontSize="2xl" textAlign="center">{CardItem.cardName}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ConfirmControlScreen",CardItem)}>
                <View style={styles.container}>
                    {
                        renderImages()
                    }   
                </View>
            </TouchableOpacity>
        </Stack >
    )
}

export default HomeCardDetail;