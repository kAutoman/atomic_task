import React, { useEffect, useRef, useState } from 'react'
import { Text, Stack, Box, Image, Icon, Input, HStack, View } from 'native-base'
import { COLOR, database, Images, LAYOUT } from '../../../constants'
import { AppState, ScrollView, TouchableOpacity } from 'react-native'
import { PrivateMessage } from '../../../components'
import { useSelector } from 'react-redux'

const ChatScreen = ({ navigation }) => {
    const [selectedUser, setSelectedUser] = useState(navigation.state.params);
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState();
    const { user } = useSelector((store) => store.auth);
    const scrollbox = useRef(null)

    const sendMessage = () => {
        if (message != '') {
        
            console.log(user.name)
            const data = { message, sender: user.email, senderName: user.name, receiver: selectedUser.email, createdAt: new Date().valueOf(), state: false }
            database.ref(`private-message`).push(data).then(e => {
                setMessage('')
            }).catch(error => {
                console.log(error)
            })
    
        }
    }

    const loadMessage = async () => {
        database.ref(`private-message`).on('value', async snapshot => {
            if (snapshot.val()) {
                setMessageList(snapshot.val());
            }
        })
    }   

    const _handleShow = () => {
        for (const key in messageList) {
            if (messageList[key].receiver === user.email && messageList[key].sender === selectedUser.email) {
                database.ref(`private-message`).child(key).update({ 'state': true });
            }
        }
    }

    const _handleAppStateChange = (nextAppState) => {
        if (
            nextAppState === 'active'
        ) {
            loadMessage();
        } else {
            database.ref(`private-message`).off('value')
        }
    };

    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange);
        loadMessage();
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        };
    }, [])
    return (
        <Box flex={1} bg={"#fff"} pt={12}>
            <Stack
                flex={1}
            >
                <HStack
                    h={
                        65}
                    px={7}
                    alignItems="center"
                    borderBottomWidth={2}
                    justifyContent="center"
                >
                    <View pos="absolute" alignItems='flex-start' w={10} left={5} zIndex={10}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <Text fontSize='2xl' bold color={COLOR.black} numberOfLines={1}>{selectedUser.name}</Text>
                    <View>
                    </View>
                </HStack>
                <Stack py={3} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false} ref={scrollbox} onContentSizeChange={() => { scrollbox.current.scrollToEnd() }} >
                        {
                            Object.values(messageList).map((item, i) => {
                                return <PrivateMessage key={i} item={item} user={user} userData={selectedUser} />
                            })
                        }
                    </ScrollView>

                </Stack>
            </Stack>
            <Box p={5} pb={12}>
                <Input
                    InputRightElement={
                        <>
                            {/* <Icon
                                size="sm"
                                mx={2}
                                _light={{
                                    color: "black",
                                }}
                                _dark={{
                                    color: "gray.300",
                                }}
                            >
                                {LAYOUT.VoiceIcon}
                            </Icon> */}
                            <TouchableOpacity onPress={sendMessage}>
                                <Icon
                                    size="sm"
                                    mx={2}
                                    mr={5}
                                    _light={{
                                        color: "black",
                                    }}
                                    _dark={{
                                        color: "gray.300",
                                    }}
                                >{LAYOUT.SendIcon}</Icon>
                            </TouchableOpacity>
                        </>
                    }
                    borderWidth={2}
                    borderRadius={100}
                    borderColor="black"
                    placeholder="Escribe un mensaje" // mx={4}
                    _focus={{
                        borderColor: "black"
                    }}
                    _light={{
                        placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                        placeholderTextColor: "blueGray.400",
                    }}
                    onFocus={_handleShow}
                    value={message}
                    onChangeText={setMessage}
                />
            </Box>
        </Box>
    )
}

export default ChatScreen;