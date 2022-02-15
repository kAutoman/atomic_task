import React, { useEffect, useState } from 'react'
import { Text, Stack, Button, Box, Image, Icon, Input, HStack, View, Switch, useToast, Spinner, Center } from 'native-base'
import { COLOR, Images, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
// import WeekdayPicker from "react-native-weekday-picker"
import { DayPicker } from 'react-native-picker-weekday';


const CreateTaskScreen = ({ navigation }) => {
    const [Item, setItem] = useState(navigation.state.params);
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [aday, setAday] = useState(Item ? Item.time.slice(0, 3) : moment(new Date).format("dddd"));
    const [time, setTime] = useState(moment(new Date).add(1, 'day').format("YYYY/MM/DD hh:mm A"));
    const [val_timestamp, setTimestamp] = useState(false);
    const [title, setTitle] = useState();
    const [repeatState, setRepeatState] = useState(false);
    // const [repeatDays, setWeekDays] = useState({ 0:1, 1:1, 2:1 , 3:1 , 4:1 , 5:0, 6:0 });
    const [repeatDays, setWeekDays] = useState([]);
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth);
    const Toast = useToast();    
    // let repeatDays = { 0:1, 1:1, 2:1 , 3:1 , 4:1 , 5:0, 6:0 };
    


    useEffect(() => {        
        console.log("CreateTaskScreen::::::" + JSON.stringify(repeatDays));        
    });
    
    const RepeatDaysHandle = (repeatDays) => {
        console.log(repeatDays);
        setWeekDays(repeatDays);
    }

    var modifiers = {
      'weekend': function(weekday) {
        return weekday == 0 || weekday == 6;
      }
    }

    const SaveHandle = async () => {        
        //validate repeat days
        let noSelected = true;
        if(repeatDays.length > 0){
            noSelected = false;
        }
    
        if (title) {
            if ((noSelected === true) && (repeatState === true)) {
                return Toast.show({ title: 'por favor seleccione cualquier día!', placement: 'bottom', status: 'error', w: 400 })
            }
            const timeStamp = Math.floor(Date.now() / 1000);
            const insertKey = "_" + timeStamp;
            setLoading(true)
            navigation.navigate("DepositoScreen", {
                user: user.email,
                time,
                created_at: new Date(),
                deadline: new Date(time),
                repeatState,
                repeatDays,
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
                    <Text style={{fontSize:27}} color="black" bold>Crear una tarea</Text>                    
                    <View>
                    </View>
                </HStack>             
                <Stack p={7} space={5}>
                    <Stack space={3}>
                        <Text fontSize="lg" style={{textAlign:"center"}} color="black" bold>Fijar fecha limite</Text>
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
                        <Text fontSize="lg" style={{textAlign:"center"}} color="black" bold>Nombre de la tarea</Text>
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
                    {
                        repeatState &&
                            // <WeekdayPicker
                            //     days={repeatDays}
                            //     onChange={RepeatDaysHandle}
                            // ></WeekdayPicker>
                            <DayPicker
                              weekdays={repeatDays}
                              setWeekdays={RepeatDaysHandle}
                              activeColor='#04ef52'
                              textColor='white'
                              inactiveColor='grey'
                            />

                    }
                    
                    
                    {/* <HStack space={3} justifyContent="space-between" alignItems="center">
                        <Text fontSize="lg" color="black" bold>Notificaciones</Text>
                        <Switch colorScheme="yellow" size="lg" isChecked={notificationState} onChange={() => { setNotificationState(!notificationState) }} />
                    </HStack> */}
                    
                    <Button disabled={loading} mt={10} _text={{ fontWeight: "bold", color: "white" }} onPress={SaveHandle} borderRadius={16} bg={COLOR.base} variant="ghost">
                        {
                            loading ?
                                <Spinner size="sm" />
                                : "Guardar"
                        }
                    </Button>
                </Stack>
                <Stack py={3} flex={1}>                    
                    {
                        show ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                mode="date"
                                value={new Date(time)}
                                display="default"                                
                                onChange={(e, s) => { 
                                    setShow(false);                                    
                                    setAday(moment(s).format("dddd")); 
                                    setTime(moment(s).format("YYYY/MM/DD hh:mm A"));
                                    setShowTime(true);                                    
                                }}
                            /> : null
                    }
                    {
                        showTime ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                mode="time"
                                value={new Date(time)}
                                display="default"
                                onChange={(e, s) => { 
                                    setShowTime(false); 
                                    console.log(moment(s).toString());
                                    setTime(moment(s).format("YYYY/MM/DD hh:mm A"));
                                }}
                            /> : null
                    }
                </Stack>
            </Stack>

        </Box>
    )
}

export default CreateTaskScreen;