import React, { useEffect, useState } from 'react'
import { Text, Stack, Button, Box, Image, HStack, Avatar, ScrollView, Input, Icon} from 'native-base'
import { db, Images, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import { Loading } from '../../../components'
import { Feather } from "@expo/vector-icons"

import moment from 'moment';


const App = ({ navigation }) => {
    const [confirms, setConfirms] = useState([]);
    const [tabstate, setTabstate] = useState(0);
    const [loading, setLoading] = useState(true);
    const [SearchKey, setSearch] = useState("");    
    let emailList = [];

    let ci = 1;
    const LoadConfirms = () => {
        db.collection("confirmation").get().then((querySnapshot) => {
            let temp = [];
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), uid: doc.id });
            });
            setConfirms(temp);
            setLoading(false);
        });
    }

    useEffect(() => {
        LoadConfirms();
    }, [navigation.state.params])

    return (
        <Box flex={1} 
        bg={"#fff"} pt={10}>
            {loading && <Loading />}
            <Stack
                flex={1}
            >
                <Box pos="absolute" zIndex={10} top={5} left={5}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen", 321123)}>
                        <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                    </TouchableOpacity>
                </Box>
                <Box
                    pt={10}
                    px={10}
                >
                    <Text mb={3} color="black" fontSize="4xl" textAlign="center" bold>Confirms</Text>
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
                        onChangeText={(val)=>{setSearch(val)}}
                    />
                    <HStack pt={5} justifyContent="space-between">
                        <Button variant="ghost" _text={{ ...Styles.WelcomeButton, color: "black" }} paddingX={1} borderWidth={1} borderColor="black" onPress={() => setTabstate(0)} borderRadius={24} bg={tabstate ==0 ? "#FFB61D" : "white"} >confirmar</Button>
                        <Button variant="ghost" _text={{ ...Styles.WelcomeButton, color: "black" }} paddingX={1} borderWidth={1} borderColor="black" onPress={() => setTabstate(1)} borderRadius={24} bg={tabstate ==1 ? "#FFB61D" : "white"} >completa</Button>
                        <Button variant="ghost" _text={{ ...Styles.WelcomeButton, color: "black" }} paddingX={1} borderWidth={1} borderColor="black" onPress={() => setTabstate(2)} borderRadius={24} bg={tabstate ==2 ? "#FFB61D" : "white"} >baneados</Button>
                    </HStack>
                </Box>
                <Stack py={3} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            confirms.map((item, i) => {
                                if (tabstate  == 0) {
                                    if (item.state === "requested" || (item.state === 'continue' && (item.photo.length !== item.confirmedTasks.length)) ) {
                                        ci++;
                                        if (emailList.indexOf(item.email) === -1) {
                                            emailList.push(item.email);
                                            if (item.username.toLowerCase().search(SearchKey.toLowerCase()) > -1) {
                                                return <TouchableOpacity key={i} onPress={() => navigation.navigate("ConfirmDetailScreen", item)}>
                                                    <HStack p={5} bg={ci % 2 ? "#F7F7F8" : "#eefbde"}>
                                                        <Avatar source={Images.SampleAvatar3} w={"14%"}>
                                                            AK
                                                        </Avatar>
                                                        <Stack w="80%" ml="5%">
                                                            <HStack justifyContent="space-between" alignItems="center">
                                                                <Text bold w={'100%'} fontSize={30} numberOfLines={1}>
                                                                    {item.username}
                                                                </Text>
                                                            </HStack>
                                                            
                                                        </Stack>
                                                    </HStack>
                                                </TouchableOpacity>
                                            }
                                        }
                                        
                                    }
                                } else if(tabstate == 1) {
                                    if (item.state === "completed") {
                                        ci++;
                                        if (emailList.indexOf(item.email) === -1) {
                                            emailList.push(item.email);
                                            if (item.username.toLowerCase().search(SearchKey.toLowerCase()) > -1) {
                                                return <TouchableOpacity key={i} onPress={() => navigation.navigate("ConfirmDetailScreen", item)}>
                                                    <HStack p={5} bg={ci % 2 ? "#F7F7F8" : "#eefbde"}>
                                                        <Avatar source={Images.SampleAvatar3} w={"14%"}>
                                                            AK
                                                        </Avatar>
                                                        <Stack w="80%" ml="5%">
                                                            <HStack justifyContent="space-between" alignItems="center">
                                                                 <Text bold w={'100%'} fontSize={30} numberOfLines={1}>
                                                                    {item.username}
                                                                </Text>
                                                            </HStack>
                                                            
                                                        </Stack>
                                                    </HStack>
                                                </TouchableOpacity>
                                            }
                                        }
                                    }
                                }
                                else if(tabstate == 2) {
                                    if (item.state === "deny") {
                                        ci++;
                                        if (emailList.indexOf(item.email) === -1) {
                                            emailList.push(item.email);
                                            if (item.username.toLowerCase().search(SearchKey.toLowerCase()) > -1) {
                                                return <TouchableOpacity key={i} onPress={() => navigation.navigate("ConfirmDetailScreen", item)}>
                                                            <HStack p={5} bg={ci % 2 ? "#F7F7F8" : "#eefbde"}>
                                                                <Avatar source={Images.SampleAvatar3} w={"14%"}>
                                                                    AK
                                                                </Avatar>
                                                                <Stack w="80%" ml="5%">
                                                                    <HStack justifyContent="space-between" alignItems="center">
                                                                         <Text bold w={'100%'} fontSize={30} numberOfLines={1}>
                                                                            {item.username}
                                                                        </Text>
                                                                    </HStack>
                                                                </Stack> 
                                                            </HStack>
                                                        </TouchableOpacity>                
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    </ScrollView>
                </Stack>
            </Stack>
        </Box >
    )
}

export default App;