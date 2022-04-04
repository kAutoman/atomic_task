import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity} from 'react-native'
import { Box, Stack, ScrollView, Text, Input, Icon, Image } from 'native-base'
import { StoreHeaders, Loading } from '../../../components'
import { COLOR, db, Images, LAYOUT, Styles } from '../../../constants'
import { useSelector } from 'react-redux'
import { Feather } from "@expo/vector-icons"

const ProductsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [services, setServiceItems] = useState([]);
    const [SearchKey, setSearch] = useState("");    
    const StoreItem = navigation.state.params;
    const LoadExchangeInfo = () => {        
        setLoading(true)        
        db.collection("Stocks").where("type", "==", 'fisico').get().then((querySnapshot) => {
            let tempCards = [];
            querySnapshot.forEach((doc) => {
                tempCards.push({ ...doc.data(), uid: doc.id });
            });
            setServiceItems(tempCards);
            setLoading(false);
        });
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation.state.params])

    return (
        <Box flex={1} bg={COLOR.base} w='100%'>
            {loading && <Loading />}
            <StoreHeaders 
                color={COLOR.base}                
                left={
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image size="xs" source={Images.GobackImage} />
                    </TouchableOpacity>
                }       
                right={
                    <TouchableOpacity onPress={() => {}}>
                        <Icon viewBox="0 0 26 24" size="md" width={40} height={40}>{LAYOUT.ShoppingBasketIcon}</Icon>
                    </TouchableOpacity>
                }         
            />
            <Stack flex={1} px={10}>                
                <Input
                    InputRightElement={
                        <Icon
                            as={<Feather name="search" />}
                            size="sm"
                            mx={3}
                            _light={{
                                color: "black",
                            }}
                            _dark={{
                                color: "gray.300",
                            }}
                        />
                    }
                    backgroundColor="white"
                    borderWidth={2}
                    borderRadius={16}
                    borderColor="black"
                    placeholder="Search with love ..." // mx={4}
                    _focus={{
                        borderColor: "black"
                    }}
                    _light={{
                        placeholderTextColor: "blueGray.700",
                    }}
                    _dark={{
                        placeholderTextColor: "blueGray.550",
                    }}
                    onChangeText={setSearch}
                />
                <Text mb={3} mt={7} color="white" fontSize={48} textAlign="center" bold>Productos</Text>
                {/* <View style={{flexDirection:"row",  justifyContent:"space-between", padding:12}} >
                    <TouchableOpacity onPress={navigation.openDrawer} style={Styles.TouchButton}>
                        <Text mb={3} color="black" fontSize={18} textAlign="center" bold>Cursos</Text>
                        <Icon viewBox="0 4 12 12" size="5" >{LAYOUT.closebtn}</Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigation.openDrawer} style={Styles.TouchButton}>
                        <Text mb={3} color="black" fontSize={18} textAlign="center" bold>Suscripciones</Text>                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigation.openDrawer} style={Styles.TouchButton}>
                        <Text mb={3} color="black" fontSize={18} textAlign="center" bold>Libros</Text>                        
                    </TouchableOpacity>
                </View> */}
            </Stack >
            <Stack flex={2} px={10}>
                <ScrollView showsVerticalScrollIndicator={false}>                
                    {/* create a services items */}                                
                    {
                        services.map((item, i) => {    
                            if (SearchKey) {
                                if(item.title.toLowerCase().search(SearchKey.toLowerCase()) === -1){
                                    return null;
                                }
                            }                          
                            return <Stack key={i}><Stack bg={COLOR.white} borderRadius={16}>
                                                <TouchableOpacity onPress={() => { navigation.navigate("CompareProductsScreen", { ...item}) }}>
                                                    <View style={{padding:25}}>                                            
                                                        <Image source={item.image} 
                                                        style={{backgroundColor:"#F2C94C", width:"100%", height:245}}
                                                        onError={({ nativeEvent: {error} }) => console.log("error-----------------" + error) } resizeMode='cover' borderWidth={1} borderColor="black" borderRadius={16} />
                                                        <Text color="black" fontSize={28} textAlign="left" bold>{item.title}</Text>
                                                        <Text color="black" fontSize={32} textAlign="left" bold>{item.price} catd</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={Styles.ComprarButton} onPress={()=>navigation.navigate("CompareProductsScreen",item)}>
                                                    <Text mb={6} mt={6} color="white" fontSize={35} textAlign="center" bold>Comprar</Text>
                                                </TouchableOpacity>
                                            </Stack>
                                    </Stack>
                        })
                    }
                    <Box h={5}></Box>
                </ScrollView>
            </Stack>
        </Box >
    )
}

export default ProductsScreen