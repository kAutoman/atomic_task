import React, { useEffect,useState } from 'react'
import { Text, Stack, Button, Box, Image, useToast, HStack, View } from 'native-base'
import { db, Images, ROOT, Styles } from '../../../constants'
import { TouchableOpacity,StyleSheet, SafeAreaView,FlatList,ScrollView,Dimensions } from 'react-native'
import { Loading } from '../../../components';
import { Video } from 'expo-av';
import { useSelector } from 'react-redux';
import PhotoGrid from '../../../components/PhotoGrid';

const styles = StyleSheet.create({
    container: {
      display:"flex",
      marginTop:10,
    },
    scrollView: {
        backgroundColor: 'pink',
    },
    GridViewBlockStyle: {
      justifyContent: 'center',
      flex:1,
      alignItems: 'center',
      height: 250,
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
    const CardItem = navigation.state.params;
    const LoadConfirms = () => {
        db.collection("confirmation").where('email','==',CardItem.email).where('state','==',CardItem.state).get().then((querySnapshot) => {
            let temp = [];
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), uid: doc.id });
            });
            setConfirms(temp);
        });
    }
    useEffect(() => {
        LoadConfirms();
    }, [navigation.state.params]);

    const {width, height} = Dimensions.get("window");


    const renderImages = (confirmItem) => {
        var result = [];
        if (!confirmItem.repeatState) {
            result.push(<Image size="100%" height={400} style={{margin:5}} source={{ uri: `${ROOT.PAYMENT_URL}img/${confirmItem.photo[0]}` }} resizeMode="contain" alignSelf="center" />);
        }
        else {
            let photoArr = [];
        
            confirmItem.photo.forEach((temp,index)=> {
                let tmp = {};
                tmp.uri = `${ROOT.PAYMENT_URL}img/${temp}`;
                tmp.idx = index;
                if (confirmItem.confirmedTasks.indexOf(parseInt(index)) === -1) {
                    photoArr.push(tmp);
                }
                
            });
        
        
            result.push(<FlatList
                 data={ photoArr }
                 renderItem={({item,index}) => {
                    let tempUri = item.uri;
                    let tempIdx = item.idx;
                    return <TouchableOpacity style={styles.GridViewBlockStyle} onPress={() => navigation.navigate("ConfirmControlScreen",{item:confirmItem,tempIdx})}>
                        <Image width="100%" style={styles.GridViewBlockStyle} key={tempIdx} source={{ uri: tempUri }} resizeMode="cover" />
                    </TouchableOpacity>
                 }}
                 numColumns={2}
            />)
        }
        return result;
    }

    const getConfirmDetails = () => {
        let result = [];
        for(let temp of confirms) {
            result.push(<Text color="#000" fontSize="2xl" textAlign="center">{temp.cardName}</Text>);
            result.push(
                 <View style={styles.container}>
                        {renderImages(temp)}
                 </View>
             );
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