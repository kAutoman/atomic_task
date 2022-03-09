import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNavigator } from '../redux/services'
import GuestNavigation from './Guest'
import LoggedNavigation from './Logged'
import { useToast } from "native-base";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Audio } from 'expo-av';
import { db, database } from '../constants'
import { setAlarm } from '../redux/actions/authActions'
import moment from 'moment';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
    // handleNotification: async () => ({
    //     shouldShowAlert: true,
    //     shouldPlaySound: false,
    //     shouldSetBadge: false,
    // }),
});

const BACKGROUND_FETCH_TASK = 'background-fetch';

const navigation = () => {
    const { user, alarm } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const Toast = useToast();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    async function playSound(title) {
        console.log('background-fetch');

        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true
            });
            console.log("notification")
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Atomic Task 📣",
                    body: title,
                    // data: { data: 'goes here' },
                },
                trigger: { seconds: 1 },
            });
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/atom.mp3')
            );
            console.log('Playing Sound');
            await sound.playAsync();
            console.log('Played Sound');
            // Toast.show({ title: title, placement: 'top', status: 'success', w: 400, duration: 6000 * 10 })

        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    const _handleNotification = async snapshot => {
        if (snapshot) {
            if (snapshot.val()) {
                var data = snapshot.val();
                for (const key in data) {
                    if (data[key].receiver === user.email && data[key].state === false) {
                        
                            console.log(user.email, data[key].message, "===> background")
                            await Notifications.scheduleNotificationAsync({
                                content: {
                                    title: "New message from " + data[key].senderName + " 📣",
                                    body: data[key].message,
                                    // data: { data: 'goes here' },
                                },
                                trigger: { seconds: 1 },
                            });
                        
                    }
                }
            }
        }
    }

    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
        console.log("background fetch");
        await database.ref(`private-message`).off('value');

        // database.ref(`private-message`).on('value', _handleNotification)

        db.collection("Malarms").where("email", "==", user.email).get().then((querySnapshot) => {
            let tempAlarms = [];
            querySnapshot.forEach((doc) => {
                tempAlarms.push({ ...doc.data(), id: doc.id });
            });
            if (tempAlarms) {
                let d = new Date();
                for (let i = 0; i < tempAlarms.length; i++) {
                    if (tempAlarms[i].time === moment(d).format("dddd").slice(0, 3) + " " + moment(d).format("hh : mm a") && tempAlarms[i].enable === true) {
                        playSound(tempAlarms[i].title);
                    }
                }
            }
        });
        return BackgroundFetch.Result.NewData;
    });

    async function registerBackgroundFetchAsync() {
        console.log("register background")
        return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 60, // 1 minutes
            stopOnTerminate: true, // android only,
            startOnBoot: true, // android only
        });
    }

    async function unregisterBackgroundFetchAsync() {
        return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    }

    const CheckAlarm = async () => {
        console.log("inside interval")

        db.collection("Malarms").where("email", "==", user.email).get().then((querySnapshot) => {
            let tempAlarms = [];
            querySnapshot.forEach((doc) => {
                tempAlarms.push({ ...doc.data(), id: doc.id });
            });
            if (tempAlarms) {
                let d = new Date();
                for (let i = 0; i < tempAlarms.length; i++) {
                    if (tempAlarms[i].time === moment(d).format("dddd").slice(0, 3) + " " + moment(d).format("hh : mm a") && tempAlarms[i].enable === true) {
                        playSound(tempAlarms[i].title);
                    }
                }
            }
        });
    };

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'Atomic Task',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    React.useEffect(() => {
        // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            // setNotification(notification);
        });

        Audio.requestPermissionsAsync();

        responseListener.current = Notifications.addNotificationResponseReceivedListener(({ notification }) => {
            // db.collection("users").where("email", "==", notification.trigger.channelId).get().then((querySnapshot) => {
            //     let tempCards = {};
            //     querySnapshot.forEach((doc) => {
            //         tempCards = { ...doc.data(), uid: doc.id };
            //     });
            //     navigation.navigate("ChatRoomScreen", tempCards);
            // });
        });
        let alarmInte = null;
        let startInte = null;
        if (user) {
            startInte = setInterval(() => {
                let startT = moment(new Date()).format("ss");
                if (startT === "00") {
                    console.log("time start")
                    LoadAlarms();
                    checkStatusAsync();
                    CheckAlarm();
                    alarmInte = setInterval(CheckAlarm, 60000);
                    clearInterval(startInte);
                }
            }, 1000);

            // database.ref(`private-message`).on('value', _handleNotification)
        }

        return async () => {
            if (alarmInte) {
                await clearInterval(alarmInte);
            }
            await database.ref(`private-message`).off();
            await clearInterval(startInte);
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
            // await unregisterBackgroundFetchAsync();
        }
    }, [user]);

    const LoadAlarms = () => {
        db.collection("Malarms").where("email", "==", user.email).get().then((querySnapshot) => {
            let tempAlarms = [];
            querySnapshot.forEach((doc) => {
                tempAlarms.push({ ...doc.data(), id: doc.id });
            });
            dispatch(setAlarm(tempAlarms));
        });
    }


    const checkStatusAsync = async () => {
        await BackgroundFetch.getStatusAsync();
        await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        await registerBackgroundFetchAsync();
    };

    if (user) {
        return (
            <LoggedNavigation ref={ref => setNavigator(ref)} />
        )
    } else {
        return <GuestNavigation />
    }
}

export default navigation