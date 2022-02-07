import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, LayoutAnimation } from 'react-native'
import { Box, Stack, ScrollView, Text, Input, Icon, Button, Image } from 'native-base'
import { Headers, Loading } from '../../../components'
import { COLOR, db, Images, LAYOUT, Styles } from '../../../constants'
import { useSelector } from 'react-redux'
import { Feather } from "@expo/vector-icons"
import { flexDirection } from 'styled-system'

const StoreScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [services, setServiceItems] = useState([]);
    const [SearchKey, setSearch] = useState("");    
    const LoadExchangeInfo = () => {        
        setLoading(true)        
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
        LoadExchangeInfo()
    }, [navigation.state.params])

    return (
        <Box flex={1} bg={COLOR.base} w='100%'>
            {loading && <Loading />}
            <Headers
                left={
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Image size="xs" source={Images.NavBarImage} />
                    </TouchableOpacity>
                }       
                right={
                    <TouchableOpacity onPress={() => {}}>
                        <Icon viewBox="0 0 26 24" size="md">{LAYOUT.ShoppingBasketIcon}</Icon>
                    </TouchableOpacity>
                }         
            />
            <Stack flex={1} px={10}>
                <Text mb={3} color="#FFB61D" fontSize="5xl" textAlign="center" bold>Tienda</Text>
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
                <View style={{flexDirection:"row", justifyContent:"center", padding:12}} >
                    <TouchableOpacity onPress={navigation.navigate("StoreDetail")}>
                        <Text mb={3} color="white" fontSize="3xl" textAlign="center" bold>Servicios</Text>                        
                    </TouchableOpacity>
                    <Text mb={3} color="#FFB61D" fontSize="3xl" textAlign="center" px="3" bold>|</Text>
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Text mb={3} color="white" fontSize="3xl" textAlign="center" bold>Productos</Text>                        
                    </TouchableOpacity>
                </View>
            </Stack >
            <Stack flex={2} px={10}>
                <ScrollView showsVerticalScrollIndicator={false}>                
                    {/* create a services items */}                                
                    {
                        services.map((item, i) => {                            
                            return <Stack key={i}><Stack bg={COLOR.white} mt="3" borderRadius={16}>
                                        <TouchableOpacity onPress={() => { navigation.navigate("StoreDetailScreen", { ...item, itemName: item.name }) }}>
                                            <View style={{padding:15}}>                                            
                                            <Image source={{uri:item.img}} 
                                             style={{backgroundColor:"#F2C94C", width:300, height:245}}
                                             onError={({ nativeEvent: {error} }) => console.log("error-----------------" + error) } resizeMode='cover' borderWidth={1} borderColor="black" borderRadius={16} />
                                            <Text color="black" fontSize="21" textAlign="left" >{item.name}</Text>
                                            <Text color="black" fontSize="21" textAlign="left" bold>{item.price + item.unit}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Styles.ComprarButton} onPress={navigation.openDrawer}>
                                            <Text mb={3} color="white" fontSize="24" textAlign="center" bold>Comprar</Text>
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

export default StoreScreen