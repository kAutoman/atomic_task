import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity,Dimensions} from 'react-native'
import { Box, Stack, ScrollView, Text, Input, Icon, Image,Button } from 'native-base'
import { StoreHeaders, Loading } from '../../../components'
import { COLOR, db, Images, LAYOUT, Styles } from '../../../constants'
import { useSelector } from 'react-redux'
import { Feather } from "@expo/vector-icons"

const CompareServicesScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [services, setServiceItems] = useState([]);
    const [SearchKey, setSearch] = useState("");    
    const StoreItem = navigation.state.params;
    const [isVisible, setModalStatus] = useState(false); 
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const LoadExchangeInfo = () => {        
        setLoading(true);
        db.collection("services").get().then((querySnapshot) => {
            let tempCards = [];
            querySnapshot.forEach((doc) => {
                tempCards.push({ ...doc.data(), uid: doc.id });
            });
            setServiceItems(tempCards);
            setLoading(false);
        });
    }

    useEffect(() => {
        console.log("storedetail----------------"+ navigation.state.params);
        LoadExchangeInfo()
    }, [navigation.state.params])

    return (
        <Box flex={1} bg="#FA6E5A" w='100%'>
            {loading && <Loading />}
            <StoreHeaders                
                left={
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image resizeMode='stretch' source={Images.GobackImage} height={42} width={48}/>
                    </TouchableOpacity>
                }       
                    
            />
            
            <Stack>
                <Stack mt="3" borderRadius={16}>
                    
                        <View style={{padding:20,height:100}}> 
                            {
                                services.map((item, i) => {  
                                    return <Image source={{uri:item.img}} 
                                    style={{width:"100%", height:400}}
                                    key={i}
                                    onError={({ nativeEvent: {error} }) => console.log("error-----------------" + error) } resizeMode='cover' borderRadius={16} />
                                })
                            }
                            <Text color="white" fontSize="40px" textAlign="center" bold>Suscripcion de Spotify</Text>    
                            <Text color="white" fontSize="28px" textAlign="center" >Al canjear este servicio tendras acceso premium durante un mes en Spotify</Text>                                      
                            <View style={{marginTop:50,marginLeft:20,display:"flex",flexWrap:"wrap",alignItems:"center"}}>
                                <Text color="white" w="40%" fontSize="40px" textAlign="left" bold>200 catd</Text>    
                                <TouchableOpacity>
                                    <Button size="sm" ml={15} w={180} h={60} alignSelf="center" borderRadius={16} onPress={()=>{setModalStatus(true)}}  variant="solid" backgroundColor="black">
                                        <Text fontSize="28px" color="white" bold>Comprar &gt;</Text>
                                    </Button>
                                </TouchableOpacity>
                            </View>
                            {
                                isVisible ? (
                                    <Stack style={{position:"absolute",top:-130,width:windowWidth,height:windowHeight+20}} bg="#00000085" zIndex={100}>
                                        <Box borderWidth={2} borderRadius={16} width={windowWidth-40} left={5} style = {{padding:10 ,flex: 1,zIndex:120,minHeight:300,borderColor:"black", alignItems: 'center',backgroundColor:"white",position:"absolute",top:250}}>
                                            <TouchableOpacity onPress={()=>setModalStatus(false)}>
                                                <Image source={Images.ExitImage} resizeMode="contain" />
                                            </TouchableOpacity>          
                                            <Text mt={10} fontSize="42px" textAlign="center" bold color="black" mb={10}>quieres confirmar la compra</Text>
                                            <TouchableOpacity mt={20} onPress={()=>setModalStatus(false)}>
                                                <View backgroundColor="black"  borderRadius={20} borderWidth={2} padding={2} >
                                                    <Text fontSize="50px" color="white" paddingLeft={5} paddingRight={5}>Confirmar</Text>
                                                </View>
                                            </TouchableOpacity>  
                                        </Box>
                                    </Stack>
                                ) :
                                <></>
                            }
                        </View>
                    
                </Stack>
            </Stack>
        </Box >
    )
}

export default CompareServicesScreen