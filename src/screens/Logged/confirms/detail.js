import React, { useEffect,useState } from 'react'
import { Text, Stack, Button, Box, Image, useToast, HStack, View } from 'native-base'
import { db, Images, ROOT, Styles } from '../../../constants'
import { TouchableOpacity,StyleSheet, SafeAreaView,FlatList,ScrollView,Dimensions } from 'react-native'
import { Loading } from '../../../components';
import { Video } from 'expo-av';
import { useSelector } from 'react-redux';
import GridImageView from 'react-native-grid-image-viewer';

const styles = StyleSheet.create({
    container: {
      display:"flex",
      flexWrap:"wrap",
      marginTop:10,
    },
    scrollView: {
        backgroundColor: 'pink',
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


    const renderImages = (item) => {
        var result = [];
        if (!item.repeatState) {
            result.push(<Image size="100%" height={400} style={{margin:5}} source={{ uri: `${ROOT.PAYMENT_URL}img/${item.photo[0]}` }} resizeMode="contain" alignSelf="center" />);
        }
        else {
            for(let temp of item.photo){
                result.push(<Image width="100%" height={400} style={{margin:5}} key={temp} source={{ uri: `${ROOT.PAYMENT_URL}img/${temp}` }} resizeMode="contain" alignSelf="center" />);
            }
            // let photoArr = [];
            // for(let temp of item.photo){
            //     let tmp = `${ROOT.PAYMENT_URL}img/${temp}`;
            //     photoArr.push(tmp);
            // }

            // result.push(<GridImageView data={photoArr} />)
        }
        return result;
    }

    const getConfirmDetails = () => {
        let result = [];
        for(let temp of confirms) {
            result.push(<Text color="#000" fontSize="2xl" textAlign="center">{temp.cardName}</Text>);
            result.push(<TouchableOpacity onPress={() => navigation.navigate("ConfirmControlScreen",temp)} style={{marginBottom:200}}>
                 <View style={styles.container}>
                        {renderImages(temp)}
                 </View>
             </TouchableOpacity>);
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