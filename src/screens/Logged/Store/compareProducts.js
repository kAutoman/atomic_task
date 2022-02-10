import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity} from 'react-native'
import { Box, Stack,HStack, ScrollView, Text, Input, Icon, Image,Button,Modal } from 'native-base'
import { StoreHeaders, Loading } from '../../../components'
import { COLOR, db, Images, LAYOUT, Styles } from '../../../constants'
import { useSelector } from 'react-redux'
import { Feather } from "@expo/vector-icons"


const CompareServicesScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [services, setServiceItems] = useState([]);
    const [SearchKey, setSearch] = useState(""); 
    const [isVisible, setModalStatus] = useState(false); 
    const StoreItem = navigation.state.params;
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
        <Box flex={1} bg="#007AFF" w='100%'>
            {loading && <Loading />}
            <StoreHeaders                
                left={
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image size="xs" source={Images.GobackImage} />
                    </TouchableOpacity>
                }
                color="#007AFF" 
            />
            
            <Stack>
                <Stack mt="3" borderRadius={16}>
                    
                        <View style={{padding:15,height:100}}> 
                            {
                                services.map((item, i) => {  
                                    return <Image source={{uri:item.img}} 
                                    style={{width:"100%", height:400}}
                                    key={i}
                                    onError={({ nativeEvent: {error} }) => console.log("error-----------------" + error) } resizeMode='cover' borderRadius={16} />
                                })
                            }
                            <Text color="white" fontSize="40px" textAlign="center" bold>CAMISETA FCK TAX</Text>    
                            <Text color="white" fontSize="28px" textAlign="center" >Camiseta de Racksmafia al  comprar este producto recibes un codigo que puedes canjear en la tienda Racks.</Text>                                      
                            <View style={{marginTop:50,display:"flex",flexWrap:"wrap",alignItems:"center"}}>
                                <Text color="white" w="40%" fontSize="40px" textAlign="left" bold>200 catd</Text>    
                                <TouchableOpacity>
                                    <Button size="sm" w={160} h={60} alignSelf="center" borderRadius={16} onPress={()=>{setModalStatus(true)}}  variant="solid" backgroundColor="black">
                                        Comprar
                                    </Button>
                                </TouchableOpacity>
                            </View>

                            {
                                isVisible ? (
                                    <Box borderWidth={2} borderRadius={16} style = {{padding:10 ,flex: 1,width:"99%",minHeight:300,borderColor:"black", alignItems: 'center',backgroundColor:"white",position:"absolute",top:130,left:20}}>
                                        <TouchableOpacity onPress={()=>setModalStatus(false)}>
                                            <Image source={Images.ExitImage} resizeMode="contain" />
                                        </TouchableOpacity>          
                                        <Text mt={10} fontSize="42px" textAlign="center" color="black" mb={10} bold>quieres confirmar la compra</Text>
                                        <TouchableOpacity mt={20} onPress={()=>setModalStatus(false)}>
                                            <View backgroundColor="black"  borderRadius={20} borderWidth={2} padding={2} >
                                                <Text fontSize="50px" color="white" paddingLeft={5} paddingRight={5}>Confirmar</Text>
                                            </View>
                                        </TouchableOpacity>  
                                    </Box>
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