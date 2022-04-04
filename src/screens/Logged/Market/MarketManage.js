import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, LayoutAnimation } from 'react-native'
import { Box, Stack, ScrollView, Text, Input, Icon, Button, Image,HStack } from 'native-base'
import { Headers, Loading } from '../../../components'
import { COLOR, db, Images, LAYOUT, Styles } from '../../../constants'
import { useSelector } from 'react-redux'
import { Feather } from "@expo/vector-icons"
import { flexDirection } from 'styled-system'

const MarketManageScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [services, setServiceItems] = useState([]);
    const [SearchKey, setSearch] = useState("");
    const [searchState, setSearchState] = useState("");
    const LoadExchangeInfo = () => {
        setLoading(true)        
        db.collection("Stocks").get().then((querySnapshot) => {
            let tempCards = [];
            querySnapshot.forEach((doc) => {
                tempCards.push({ ...doc.data(), uid: doc.id });
            });
            setServiceItems(tempCards);
            setLoading(false);
        });
    }

    const _handleDelete = (id) => {
        setServiceItems([]);
        db.collection("Stocks").doc(id).delete();
        LoadExchangeInfo();
    }

    const renderFilterBtn = () => {
        if (!searchState) {
            return <>
                    <TouchableOpacity onPress={()=>setSearchState('digital')}>
                        <Text color="white" fontSize="5xl" textAlign="center" bold px={3} py={1} bg={"#FFB61D"} borderRadius={30}>Digital</Text>                        
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>setSearchState('fisico')}>
                        <Text color="white" fontSize="5xl" textAlign="center" bold px={5} py={1} bg={"#F24E1E"} ml={6} borderRadius={30}>Fisico</Text>                        
                    </TouchableOpacity>
                </>
        }
        else if (searchState === 'digital') {
            return <TouchableOpacity onPress={()=>setSearchState('fisico')}>
                        <Text color="white" fontSize="5xl" textAlign="center" bold px={5} py={1} bg={"#F24E1E"} ml={6} borderRadius={30}>Fisico</Text>                        
                    </TouchableOpacity>
        } 
        else {
            return <TouchableOpacity onPress={()=>setSearchState('digital')}>
                        <Text color="white" fontSize="5xl" textAlign="center" bold px={5} py={1} bg={"#FFB61D"} borderRadius={30}>Digital</Text>                        
                    </TouchableOpacity>
        }
        
    }

    useEffect(() => {
        LoadExchangeInfo();
    }, [navigation.state.params])

    return (
        <Box flex={1} bg="#231F20" w='100%'>
            {loading && <Loading />}
            <Stack flex={1} px={10} mt={69}>
            <Input
                    InputRightElement={
                        <Icon
                            as={<Feather name="search" />}
                            size="sm"
                            mx={17}
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
                <Text mb={3} color="white" fontSize="5xl" textAlign="center" bold>Market</Text>
                <View style={{flexDirection:"row", justifyContent:"center", padding:12}} >
                    {
                        renderFilterBtn()   
                    }
                </View>
            </Stack >
            <Stack flex={2} px={3}>
                <ScrollView showsVerticalScrollIndicator={false} mt={43}>
                    {
                        services.map((stock,index) => {
                            if (searchState) {
                                if (stock.type !== searchState) {
                                    return null;
                                }
                            }
                            if (SearchKey) {
                                if(stock.title.toLowerCase().search(SearchKey.toLowerCase()) === -1){
                                    return null;
                                }
                            }
                            return <Stack my={3} key={index} bg="#FFB61D"  style={{borderRadius:10}}>
                                        <HStack alignItems="center" p={4}>
                                            <Text color="black" fontSize="3xl" flex={1} bold numberOfLines={2}>{stock.title}</Text>
                                            <Box ml={3}>
                                                <TouchableOpacity onPress={() => _handleDelete(stock.uid)}>
                                                    <Image source={Images.TrashOutline}/>
                                                </TouchableOpacity>
                                            </Box>
                                            <Box>
                                                <TouchableOpacity onPress={() => navigation.navigate("EditStockScreen",stock)}>
                                                    <Image source={Images.EditImage}/>
                                                </TouchableOpacity>
                                            </Box>
                                        </HStack>
                                    </Stack>
                        })
                    }                
                </ScrollView>
            </Stack>
            <TouchableOpacity onPress={() => navigation.navigate("EditStockScreen")}>
                <Stack alignItems="center" bottom={0} h={66} bg="#18191F" width="100%" py={1}>
                    <Text color="white" fontSize="4xl" flex={1} bold>Add Product</Text>
                </Stack>
            </TouchableOpacity>
        </Box >
    )
}

export default MarketManageScreen