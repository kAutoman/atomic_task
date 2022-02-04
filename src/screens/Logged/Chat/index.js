import React, { useEffect, useState } from 'react'
import { Text, Stack, Box, Image, Icon, Input, HStack, Avatar, ScrollView } from 'native-base'
import { database, db, Images, LAYOUT } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import { Feather } from "@expo/vector-icons"
import { useSelector } from 'react-redux'
import moment from 'moment'

const ChatScreen = ({ navigation }) => {
    const { user } = useSelector((store) => store.auth);
    const [userList, setUserList] = useState([]);
    const [SearchKey, setSearch] = useState("");
    const [latestMessage, setLatestMessage] = useState({});
    
    const LoadUsers = () => {
        if (user.email === LAYOUT.adminInfo.email) {
            db.collection("users").get().then((querySnapshot) => {
                console.log("doc.data()");
                let users = [];
                querySnapshot.forEach((doc) => {
                    if (doc.id !== LAYOUT.adminInfo.email) {
                        users.push(doc.data());
                    }
                });
                setUserList(users);
                SetLatestMessage(users);
            });
        } else {
            setUserList([LAYOUT.adminInfo])
            SetLatestMessage([LAYOUT.adminInfo]);
        }

    }

    const SetLatestMessage = (Users) => {
        database.ref(`private-message`).on('value', async snapshot => {
            if (snapshot.val()) {
                let latestMessage = {};
                const messages = snapshot.val();
                for (let j = 0; j < Users.length; j++) {
                    for (const key in messages) {
                        const message = messages[key];
                        if ((message.sender === user.email && message.receiver === Users[j].email) || (message.sender === Users[j].email && message.receiver === user.email)) {
                            if (message.receiver === user.email) {
                                latestMessage[Users[j].email] = {
                                    message: message.message,
                                    time: message.createdAt,
                                    state: message.state
                                };
                            } else {
                                latestMessage[Users[j].email] = {
                                    message: message.message,
                                    time: message.createdAt,
                                };
                            }
                        }
                    }
                }
                setLatestMessage(latestMessage);
            }
        })
    }

    useEffect(() => {
        LoadUsers();
    }, [])

    return (
        <Box flex={1} pt={12} bg={"#fff"}>
            <Stack
                flex={1}
            >
                <Box pos="absolute" zIndex={10} top={5} left={5}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                    </TouchableOpacity>
                </Box>
                <Stack
                    pt={3}
                    px={10}
                >
                    <Text mb={3} color="black" fontSize="5xl" textAlign="center" bold>Chat</Text>
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
                </Stack>
                <Stack py={3} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            userList.map((item, i) => {
                                return <TouchableOpacity key={i} onPress={() => navigation.navigate("ChatRoomScreen", item)}>
                                    <HStack p={5} display={item.name.toLowerCase().search(SearchKey.toLowerCase()) === -1 && SearchKey !== '' ? "none" : "flex"} bg={i % 2 ? "#F7F7F8" : "#eefbde"}>
                                        <Avatar source={Images.SampleAvatar3} w={"14%"}>
                                            AK
                                        </Avatar>
                                        <Stack w="80%" ml="5%">
                                            <HStack justifyContent="space-between" alignItems="center">
                                                <Text bold w={'75%'} numberOfLines={1}>
                                                    {item.name}
                                                </Text>
                                                <Text fontSize="xxs">{latestMessage[item.email] ? moment(latestMessage[item.email].time).endOf('day').fromNow() : null}</Text>
                                            </HStack>
                                            <Text numberOfLines={1} w="90%" color={latestMessage[item.email] ? latestMessage[item.email].state === false ? "black" : "dark.300" : "dark.300"} fontWeight={latestMessage[item.email] ? latestMessage[item.email].state === false ? "700" : "normal" : "normal"}>
                                                {latestMessage[item.email] ? latestMessage[item.email].message : null}
                                            </Text>
                                        </Stack>
                                    </HStack>
                                </TouchableOpacity>
                            })
                        }
                    </ScrollView>
                </Stack>
            </Stack>
        </Box >
    )
}

export default ChatScreen;