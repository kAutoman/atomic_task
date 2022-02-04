import React, { useEffect, useState } from 'react'
import { Text, Stack, Button, Box, Image, HStack, Avatar, ScrollView } from 'native-base'
import { db, Images, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import { Loading } from '../../../components'
import moment from 'moment'

const App = ({ navigation }) => {
    const [confirms, setConfirms] = useState([]);
    const [tabstate, setTabstate] = useState(true);
    const [loading, setLoading] = useState(true);
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
                <Stack
                    pt={5}
                    px={10}
                >
                    <Text mb={3} color="black" fontSize="4xl" textAlign="center" bold>Confirms</Text>
                    <HStack justifyContent="space-between">
                        <Button w="48%" variant="ghost" _text={{ ...Styles.WelcomeButton, color: "black" }} onPress={() => setTabstate(true)} borderRadius={100} bg={tabstate ? "#FFB61D" : "white"} alignSelf="center">confirma</Button>
                        <Button w="48%" variant="ghost" _text={{ ...Styles.WelcomeButton, color: "black" }} onPress={() => setTabstate(false)} borderRadius={100} bg={!tabstate ? "#FFB61D" : "white"} alignSelf="center">completa</Button>
                    </HStack>
                </Stack>
                <Stack py={3} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            confirms.map((item, i) => {
                                if (tabstate) {
                                    if (item.state !== "completed") {
                                        ci++;
                                        return <TouchableOpacity key={i} onPress={() => navigation.navigate("ConfirmDetailScreen", item)}>
                                            <HStack p={5} bg={ci % 2 ? "#F7F7F8" : "#eefbde"}>
                                                <Avatar source={Images.SampleAvatar3} w={"14%"}>
                                                    AK
                                                </Avatar>
                                                <Stack w="80%" ml="5%">
                                                    <HStack justifyContent="space-between" alignItems="center">
                                                        <Text bold w={'75%'} numberOfLines={1}>
                                                            {item.username}
                                                        </Text>
                                                        <Text fontSize="xxs">{moment(new Date(item.created_At)).endOf('day').fromNow()}</Text>
                                                    </HStack>
                                                    <HStack justifyContent="space-between" alignItems="center">
                                                        <Text numberOfLines={1} w="75%" color={"dark.300"} >
                                                            {item.cardName}
                                                        </Text>
                                                        <HStack alignItems="center">
                                                            {(() => {
                                                                if (item.state === "requested") {
                                                                    return <Text color="red.500" fontSize="xxs" ml={-1}>solicitada</Text>;
                                                                } else if (item.state === "repeat") {
                                                                    return <Text color="red.500" fontSize="xxs" ml={-1}>repetir</Text>;
                                                                } else if (item.state === 'deny') {
                                                                    return <Text color="red.500" fontSize="xxs" ml={-1}>negar</Text>;
                                                                }
                                                            })()}
                                                            <Text fontSize="xxs"> &euro;{item.amount / 100}</Text>
                                                        </HStack>
                                                    </HStack>
                                                </Stack>
                                            </HStack>
                                        </TouchableOpacity>
                                    }
                                } else {
                                    if (item.state === "completed") {
                                        ci++;
                                        return <TouchableOpacity key={i} onPress={() => navigation.navigate("ConfirmDetailScreen", item)}>
                                            <HStack p={5} bg={ci % 2 ? "#F7F7F8" : "#eefbde"}>
                                                <Avatar source={Images.SampleAvatar3} w={"14%"}>
                                                    AK
                                                </Avatar>
                                                <Stack w="80%" ml="5%">
                                                    <HStack justifyContent="space-between" alignItems="center">
                                                        <Text bold w={'75%'} numberOfLines={1}>
                                                            {item.username}
                                                        </Text>
                                                        <Text fontSize="xxs">{moment(new Date(item.created_At)).endOf('day').fromNow()}</Text>
                                                    </HStack>
                                                    <HStack justifyContent="space-between" alignItems="center">
                                                        <Text numberOfLines={1} w="75%" color={"dark.300"} >
                                                            {item.cardName}
                                                        </Text>
                                                        <HStack alignItems="center">
                                                            <Text color="green.500" fontSize="xxs" ml={-1}>terminada</Text>
                                                            <Text fontSize="xxs"> &euro;{item.amount / 100}</Text>
                                                        </HStack>
                                                    </HStack>
                                                </Stack>
                                            </HStack>
                                        </TouchableOpacity>
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