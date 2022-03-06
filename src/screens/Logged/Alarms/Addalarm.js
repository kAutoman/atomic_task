import React, { useState } from 'react'
import { Text, Stack, Button, Box, Image, Icon, Input, HStack, View, Switch, useToast, Spinner } from 'native-base'
import { COLOR, Images, db } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const AddalarmScreen = ({ navigation }) => {
    const [Item, setItem] = useState(navigation.state.params);
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [aday, setAday] = useState(Item ? Item.time.slice(0, 3) : moment(new Date).format("dddd"));
    const [time, setTime] = useState(Item ? Item.time.slice(4, Item.time.length) : moment(new Date).format("hh : mm a"));    
    const [title, setTitle] = useState(Item ? Item.title : null);
    const [repeatState, setRepeatState] = useState(Item ? Item.repeatState : false);
    const [snooze, setsnooze] = useState(Item ? Item.snooze : true);
    const [Loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const Toast = useToast();

    const SaveHandle = async () => {        
        if (title) {
            const timeStamp = Math.floor(Date.now() / 1000);
            const insertKey = "_" + timeStamp;
            setLoading(true);
            if (Item) {
                await db.collection('Malarms').doc(Item.id).update({
                    time: aday.slice(0, 3) + " " + time,                    
                    title,
                    repeatState,
                    snooze,
                    enable: true,
                    state: 1
                }).then(() => {
                    setLoading(false);
                    navigation.navigate("AlarmsScreen", 123);
                    console.log("Data updated")
                }).catch(e => console.log(e))
            } else {
                await db.collection('Malarms').doc(insertKey).set({
                    email: user.email,
                    time: aday.slice(0, 3) + " " + time,                                        
                    title,
                    repeatState,
                    snooze,
                    enable: true,
                    state: 1
                }).then(() => {
                    setLoading(false);
                    navigation.navigate("AlarmsScreen", 123);
                    console.log("Data updated")
                }).catch(e => console.log(e))
            }
        } else {
            return Toast.show({ title: 'por favor ingrese el meta nombre!', placement: 'bottom', status: 'error' })
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
                    <Text fontSize='2xl' bold color={COLOR.black}>Alarma</Text>
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
                            value={aday.slice(0, 3) + " " + time}
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
                            value={title}
                            InputRightElement={
                                <Icon size="sm" m={3} as={<AntDesign name="edit" />} />
                            } />
                    </Stack>
                    <HStack space={3} justifyContent="space-between" alignItems="center">
                        <Text fontSize="lg" color="black" bold>Repetir</Text>
                        <Switch colorScheme="yellow" size="lg" isChecked={repeatState} onChange={() => { setRepeatState(!repeatState) }} />
                    </HStack>
                    <HStack space={3} justifyContent="space-between" alignItems="center">
                        <Text fontSize="lg" color="black" bold>Snooze</Text>
                        <Switch colorScheme="yellow" size="lg" isChecked={snooze} onChange={() => { setsnooze(!snooze) }} />
                    </HStack>
                    <Button mt={40} disabled={Loading} _text={{ fontWeight: "bold", color: "white" }} onPress={SaveHandle} borderRadius={16} bg={COLOR.base} variant="ghost">
                        {
                            Loading ? <Spinner size="sm"/> : "Save"
                        }

                    </Button>
                </Stack>
                <Stack py={3} flex={1}>
                    {
                        show ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                mode="date"
                                value={new Date}
                                display="default"
                                onChange={(e, s) => { setShow(false); setShowTime(true); setAday(moment(s).format("dddd")); }}
                            /> : null
                    }
                    {
                        showTime ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                mode="time"
                                value={new Date}
                                display="default"
                                onChange={(e, s) => { setShowTime(false); setTime(moment(s).format("hh : mm a")); setTimestamp(moment(s)); }}
                            /> : null
                    }
                </Stack>
            </Stack>

        </Box>
    )
}

export default AddalarmScreen;