import React, { useEffect,useState } from 'react'
import { Text, Stack, Button, Box, Image, useToast, HStack, View } from 'native-base'
import { db, Images, ROOT, generateUUID } from '../../../constants'
import { TouchableOpacity,StyleSheet, SafeAreaView,FlatList,ScrollView,Dimensions } from 'react-native'
import { Loading } from '../../../components';
import { Video } from 'expo-av';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
    container: {
      display:"flex",
      marginTop:10,
      marginBottom:100
    },
    scrollView: {
        backgroundColor: 'pink',
    },
    GridViewBlockStyle: {
      justifyContent: 'center',
      flex:1,
      alignItems: 'center',
      height: 250,
      width:"100%",
      margin: 0,
    },
    GridViewInsideTextItemStyle: {
       color: '#fff',
       padding: 10,
       fontSize: 18,
       justifyContent: 'center',
    },
 
    GridViewInsideTextItemStyle: {
       color: '#fff',
       padding: 10,
       fontSize: 18,
       justifyContent: 'center',
    },
    MainContainer :{
        justifyContent: 'center',
        flex:1,
        margin: 10,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    },
 
});

const HomeCardDetail = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [confirms, setConfirms] = useState([]);
    const video = React.useRef(null);
    const CardItem = navigation.state.params;
    console.log(CardItem);
    const LoadConfirms = () => {
        db.collection("confirmation").where('email','==',CardItem.email).get().then((querySnapshot) => {
            let temp = [];
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), uid: doc.id });
            });
            console.log(temp);
            setConfirms(temp);
        });
    }
    useEffect(() => {
        LoadConfirms();
    }, [navigation.state.params]);

    const {width, height} = Dimensions.get("window");

    const getMediaType = (uri) => {
        if (uri.indexOf('mp4') > -1 ){
            return 'video';
        }
        else {
            return 'image';
        }
    }


    const renderImages = (confirmItem) => {
        let result = [];
        if (!confirmItem.repeatState) {
            if (confirmItem.type === 'image') {
                result.push(
                    <TouchableOpacity key={generateUUID(10)} onPress={() => navigation.navigate("ConfirmControlScreen",{item:confirmItem,tempIdx:0})}>
                        <Image size="100%" height={400} style={{margin:5}} source={{ uri: confirmItem.photo[0] }} resizeMode="contain" alignSelf="center" />
                    </TouchableOpacity>);
            }
            else {
                result.push(
                    <TouchableOpacity key={generateUUID(10)} onPress={() => navigation.navigate("ConfirmControlScreen",{item:confirmItem,tempIdx:0})}>
                           <Video
                                ref={video}
                                style={{
                                    height: 380,
                                    marginBottom: 20,
                                    alignSelf: "center",
                                    width: "80%",
                                    maxWidth: "80%",
                                    marginTop: 0,
                                    borderRadius: 15
                                }}
                                source={{ uri: confirmItem.photo[0] }}
                                useNativeControls
                                resizeMode="contain"
                                isLooping
                            />
                    </TouchableOpacity>
                );
            }
        }
        else {
            let photoArr = [];
    
            confirmItem.photo.forEach((temp,index)=> {
                let tmp = {};
                tmp.uri = temp;
                tmp.idx = index;
                if ((!confirmItem.confirmedTasks || (confirmItem.confirmedTasks.indexOf(parseInt(index)) === -1))) {
                    photoArr.push(tmp);
                }
            });
        
        
        
            result.push(<FlatList
                 data={ photoArr }
                 key={generateUUID(10)}
                 renderItem={({item,index}) => {
                    let tempUri = item.uri;
                    let tempIdx = item.idx;
                    if (getMediaType(tempUri) === 'image') {
                        return <TouchableOpacity key={generateUUID(10)} style={styles.GridViewBlockStyle} onPress={() => navigation.navigate("ConfirmControlScreen",{item:confirmItem,tempIdx})}>
                                    <Image width="100%" key={generateUUID(10)} style={styles.GridViewBlockStyle} source={{ uri: tempUri }} resizeMode="contain" />
                                </TouchableOpacity>    
                    }
                    else {
                        return <TouchableOpacity key={generateUUID(10)} style={styles.GridViewBlockStyle} onPress={() => navigation.navigate("ConfirmControlScreen",{item:confirmItem,tempIdx})}>
                                    <Video
                                        style={styles.GridViewBlockStyle}
                                        key={generateUUID(10)} 
                                        source={{ uri: tempUri }}
                                        useNativeControls
                                        resizeMode="cover"
                                        isLooping
                                    />
                                </TouchableOpacity>       
                    }
                    
                 }}
                 numColumns={2}
            />)
        }
        return result;
    }

    const getConfirmDetails = () => {
        let result = [];
        for(let temp of confirms) {
            if (temp.state !== 'completed' && temp.state !== 'deny'){
                result.push(<Text color="#000" key={generateUUID(10)} fontSize="2xl" textAlign="center">{temp.cardName}</Text>);
                result.push(
                     <View style={styles.container} key={generateUUID(10)}>
                            {renderImages(temp)}
                     </View>
                 );
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
            <SafeAreaView>
                <ScrollView>
                    {
                        getConfirmDetails()
                    }
                </ScrollView>
            </SafeAreaView>
        </Stack >
    )
}

export default HomeCardDetail;