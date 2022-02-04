import React, { useState } from 'react'
import { Text, Stack, Button, Box, Image, Icon, Input, HStack, View, Switch, useToast, Spinner } from 'native-base'
import { COLOR, Images } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const AddalarmScreen = ({ navigation }) => {
    const [show, setShow] = useState(false);
    const [time, setTime] = useState(moment(new Date).format("hh : mm a"));
    const [title, setTitle] = useState();
    const [repeatState, setRepeatState] = useState(false);
    const [notificationState, setNotificationState] = useState(true);
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth);
    const Toast = useToast();
    
    const SaveHandle = async () => {
        if (title) {
            setLoading(true)
            navigation.navigate("DepositoScreen", {
                user: user.email,
                time,
                repeatState,
                notificationState,
                payment: 0,
                state: 1,
                fullName: "Personalizada", 
                cardName: title
            });
            setLoading(false)
        } else {
            return Toast.show({ title: 'por favor ingrese el meta nombre!', placement: 'bottom', status: 'error', w: 400 })
        }
        return;
    }

    return (
        <Box flex={1} bg={"#fff"} pt={12}>
            <Stack>
                <HStack
                    h={65}
                    px={7}
                    alignItems="center"
                    justifyContent="center"
                >
                    <View pos="absolute" alignItems='flex-start' w={10} left={5} zIndex={10}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <Text fontSize='2xl' bold color={COLOR.black}>{user.name}</Text>
                    <View>
                    </View>
                </HStack>
                <Stack p={7} space={5}>
                    <Stack space={3}>
                        <Text fontSize="lg" color="black" bold>Fijar tiempo :</Text>
                        <Input
                            h={50}
                            isDisabled
                            borderColor="black"
                            textAlign="center"
                            value={time}
                            InputRightElement={
                                <TouchableOpacity onPress={() => { setShow(true); }}>
                                    <Icon size="sm" m={3} as={<FontAwesome name="edit" />} />
                                </TouchableOpacity>
                            } />
                    </Stack>
                    <Stack space={3}>
                        <Text fontSize="lg" color="black" bold>Nombre meta :</Text>
                        <Input
                            onChangeText={(e) => setTitle(e)}
                            h={50}
                            borderColor="black"
                            _focus={{
                                borderColor: "black"
                            }}
                            textAlign="center"

                            InputRightElement={
                                <Icon size="sm" m={3} as={<AntDesign name="edit" />} />
                            } />
                    </Stack>
                    <HStack space={3} justifyContent="space-between" alignItems="center">
                        <Text fontSize="lg" color="black" bold>Repetir</Text>
                        <Switch colorScheme="yellow" size="lg" isChecked={repeatState} onChange={() => { setRepeatState(!repeatState) }} />
                    </HStack>
                    <HStack space={3} justifyContent="space-between" alignItems="center">
                        <Text fontSize="lg" color="black" bold>Notificaciones</Text>
                        <Switch colorScheme="yellow" size="lg" isChecked={notificationState} onChange={() => { setNotificationState(!notificationState) }} />
                    </HStack>
                    <Button disabled={loading} mt={40} _text={{ fontWeight: "bold", color: "white" }} onPress={SaveHandle} borderRadius={16} bg={COLOR.base} variant="ghost">
                        {
                            loading ?
                                <Spinner size="sm" />
                                : "Save"
                        }
                    </Button>
                </Stack>
                <Stack py={3} flex={1}>
                    {
                        show ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                mode="time"
                                value={new Date}
                                is24Hour={false}
                                display="spinner"
                                onChange={(e, s) => { setShow(false); setTime(moment(s).format("hh : mm a")); }}
                            /> : null
                    }
                </Stack>
            </Stack>

        </Box>
    )
}

export default AddalarmScreen;