import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Dimensions,Clipboard } from 'react-native'
import { Box, Stack,HStack, ScrollView, Text, Input, Icon, Button, Image } from 'native-base'
import { Headers, Loading } from '../../../components'
import { COLOR, db, Images, LAYOUT, Styles } from '../../../constants'
import { useSelector } from 'react-redux'
import { Feather } from "@expo/vector-icons"

const ShopHistoryScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [services, setServiceItems] = useState([]);
    const [isVisible, setModalStatus] = useState(false); 
    const [SearchKey, setSearch] = useState("");
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [code, setCode] = useState('');
    const LoadExchangeInfo = () => {        
        setLoading(true)        
        db.collection("purchaseHistory").where("email", "==", user.email).get().then((querySnapshot) => {
            let tempCards = [];
            querySnapshot.forEach((doc) => {
                tempCards.push({ ...doc.data(), uid: doc.id });
            });
        
            setServiceItems(tempCards);
            setLoading(false);
        });
    }

    const _handleClick = (item) => {
        setCode(item.uid);
        setModalStatus(true);
    }

    const _handleCopyCode = (id) => {
        Clipboard.setString(id)
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation.state.params])

    return (
        <Box flex={1} bg={COLOR.white} w='100%'>
            {loading && <Loading />}
            <Headers
                bg={COLOR.white}
                left={
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image size="xs" source={Images.GobackImage} />
                    </TouchableOpacity>
                }             
            />
            <Stack flex={1} px={10}>
                <Text color="black" fontSize="5xl" textAlign="center" bold>Historial</Text>
            </Stack >
            <Stack flex={8} px={10}>
                <ScrollView showsVerticalScrollIndicator={false} >                
                    {/* create a services items */}                                
                    {
                        services.map((item, i) => {   
                            if (SearchKey) {
                                if(item.title.toLowerCase().search(SearchKey.toLowerCase()) === -1){
                                    return null;
                                }
                            }        
                            return <Stack key={i} mb={5}><Stack bg={COLOR.white} borderRadius={16}>
                                        <TouchableOpacity onPress={() => { _handleClick(item) }}>
                                            <HStack style={{padding:25}} width="100%" height={168} borderWidth={2} borderRadius={16}>                                            
                                                <Image source={item.image} 
                                                style={{backgroundColor:"#F2C94C", width:111, height:120}}
                                                onError={({ nativeEvent: {error} }) => console.log("error-----------------" + error) } resizeMode='cover' borderWidth={1} borderColor="black" borderRadius={16} />
                                                <Stack ml={5} width="60%">
                                                    <Text color="black" fontSize={18} textAlign="left" bold>{item.title}</Text>
                                                    <Text color="#474A57" fontSize={15} textAlign="left" numberOfLines={2} >{item.subtitle}</Text>
                                                    <Text color="#474A57" fontSize={15} textAlign="left" bold>{item.price} catd</Text>
                                                    
                                                </Stack>
                                                
                                            </HStack>
                                        </TouchableOpacity>
                                    </Stack>
                            </Stack>
                        })
                    }
                    
                </ScrollView>
                {
                isVisible ? (
                    <Stack style={{position:"absolute",top:-130,width:windowWidth,height:windowHeight+20}} bg="#00000085" zIndex={100}>
                        <Box borderWidth={2} borderRadius={16} width={windowWidth-40} left={5} style = {{padding:10 ,flex: 1,zIndex:120,minHeight:300,borderColor:"black", alignItems: 'center',backgroundColor:"white",position:"absolute",top:250}}>
                            <TouchableOpacity onPress={()=>setModalStatus(false)}>
                                <Image source={Images.ExitImage} resizeMode="contain" />
                            </TouchableOpacity>          
                            <Text mt={10} fontSize="42px" textAlign="center" bold color="black" mb={10}>{code}</Text>
                            <TouchableOpacity mt={20} onPress={()=>_handleCopyCode(code)}>
                                <HStack alignItems="center">
                                    <Text fontSize="50px" color="black" >copiar </Text>
                                    <Image source={Images.ClipboardImage} resizeMode="contain" />
                                </HStack>
                            </TouchableOpacity>  
                        </Box>
                    </Stack>
                ) :
                <></>
            }
            </Stack>
           
        </Box >
    )
}

export default ShopHistoryScreen