import React, { useState } from 'react'
import { Text, Stack, Button, Box, Image, HStack, useToast, View, ScrollView } from 'native-base'
import { db, Images, ROOT, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { Loading } from '../../../components';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Video } from 'expo-av';
import { style } from 'styled-system';
import moment from 'moment';


const HomeCardDetail = ({ navigation }) => {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const Toast = useToast();
    const CardItem = navigation.state.params;
    const { user } = useSelector(store => store.auth);
    const [confirmed, setConfirmed] = useState(false);
    const video = React.useRef(null);
    const [isRepeat, setRepeatStatus] = useState(false);
    const [deadline,setDeadLine] = useState('');
    let intervalInstance;

    const checkCard = () => {
        db.collection("confirmation").where("email", "==", user.email).where("cardId", "==", CardItem.uid).get().then((querySnapshot) => {            
            let tempCards = null;
            querySnapshot.forEach((doc) => {
                tempCards = doc.data();
            });
            setConfirmed(tempCards);
            setLoading(false);
        });        
    }

    useEffect(() => {
        checkCard();
        calcDeadLine();
        return () => {
            clearInterval(intervalInstance);
        }
    }, [navigation])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            setConfirmed(false);
            return setPhoto({
                photo: result,
            });
        }
    };
    const repeatHandler = async () => {
        setRepeatStatus(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            setConfirmed(false);
            return setPhoto({
                photo: result,
            });
        }
    };

    const getImages = (para) => {
        const array = [];
        for (let i in para) {
            const uri = para[i].uri;
            const name = uri.split("/").pop();
            const match = /\.(\w+)$/.exec(name);
            const type = match ? `image/${match[1]}` : `image`;
            array.push({
                uri, name, type
            });
        }
        return array;
    }

    const renderPhotos = () => {
        let temp = [];
        let i=0;
        if (confirmed) {
            let length = confirmed.photo.length;
            return <Image size="100%" h={500} mt={70} key={i}  source={Images.DelayImage} resizeMode="contain" alignSelf="center" />;
        }
        else {
            return <Image size="100%" h={500} borderRadius={15} key={i} mt={50} source={photo.photo} resizeMode="contain" alignSelf="center" />
        }
       
    }

    const getDeadLine = () => {
        let date1 = moment(moment().add(1,'days').format('YYYY-MM-DD 00:00:00'));
        let date2 = moment();
        let diff = moment.duration(date1.diff(date2));
        
        setDeadLine(diff.get("days") + 'd '+diff.get("hours") +"h "+ diff.get("minutes") +"m "+ diff.get("seconds") + 's ');
    }

    const calcDeadLine = () => {
        intervalInstance = setInterval(getDeadLine,1000)    
    }

    const Save = () => {
        if (photo) {
            setLoading(true);
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            if (typeof (photo.photo) === 'object') {
                const photos = getImages(photo)
                for (let i = 0; i < photos.length; i++) {
                    formData.append("photo", photos[i]);
                }
            }
            xhr.open("POST", `${ROOT.PAYMENT_URL}api/v1/confirmation-photo`);
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.onload = async function () {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.response);
                    if (response.err) {
                        return Toast.show({ title: response.data, placement: 'bottom', status: 'error', w: 400 })
                    } else {
                        await db.collection("users").where("email", "==", user.email).get().then(async (querySnapshot) => {
                            const timeStamp = Math.floor(Date.now() / 1000);
                            const insertKey = "_" + timeStamp;
                            let userInfo = "";
                            querySnapshot.forEach((doc) => {
                                userInfo = doc.data();
                            });
                        
                            if (isRepeat) {
                        
                                db.collection("confirmation").where("email", "==", user.email).where("cardId", "==", CardItem.uid).get().then((querySnapshot) => {            
                                    let tempCards = null;
                                    querySnapshot.forEach((doc) => {
                                        tempCards = doc.data();
                                        tempCards.uid = doc.id
                                    });
                                    tempCards.photo.push(response.data);
                                    tempCards.type = photo.photo.type,
                                    tempCards.state = "requested";
                                    db.collection("confirmation").doc(tempCards.uid).update(tempCards);
                                    setConfirmed(tempCards);
                                });
                            }
                            else {
                                let saveData;
                                if (CardItem.repeatState) {
                                    let day = [];
                                
                                    Object.entries(CardItem.repeatDays).forEach( (value) => {
                                        day.push(value[1]);
                                    });
                                    
                                    saveData = {
                                        email: user.email,
                                        username: userInfo.name,
                                        photo: [response.data],
                                        type: photo.photo.type,
                                        cardId: CardItem.uid,
                                        cardName: CardItem.cardName,
                                        amount: CardItem.amount,
                                        day,
                                        state: "requested",
                                        repeatState : true,
                                        created_at: new Date()
                                    }
                                } 
                                else {
                                    saveData = {
                                        email: user.email,
                                        username: userInfo.name,
                                        photo: [response.data],
                                        type: photo.photo.type,
                                        cardId: CardItem.uid,
                                        cardName: CardItem.cardName,
                                        amount: CardItem.amount,
                                        state: "requested",
                                        created_at: new Date(),
                                        repeatState : false,
                                    }
                                }
                                await db.collection('confirmation').doc(insertKey).set(saveData);
                                setConfirmed(saveData);
                            }
                        });
                    }
                    setLoading(false)
                }
            }

            xhr.send(formData);
        } else {
            return Toast.show({ title: "Please select Photo.", placement: 'bottom', status: 'error', w: 400 })
        }
    }
    
    return (
        <Stack
            flex={1}
            bg={confirmed ? "#fff" : "#000"}
            p={7}
        >
            {loading ? <Loading /> :
                <>
                    <Box pos="absolute" zIndex={10} top={12} left={7}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={Images.ExitImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </Box>
                    {
                        confirmed ?
                            <>
                                <ScrollView style={{display:"flex"}}>
                                {
                                    
                                    confirmed.type === "video" ?
                                        <Video
                                            ref={video}
                                            style={{ height: 380, marginBottom: 20, alignSelf: "center", width: "80%", maxWidth: "80%", marginTop: 100, borderRadius: 15 }}
                                            source={{ uri: `${ROOT.PAYMENT_URL}img/${confirmed.photo}` }}
                                            useNativeControls
                                            resizeMode="contain"
                                            isLooping
                                        />
                                        :
                                        renderPhotos()
                                }
                                </ScrollView>
                               
                                <Text color="#000" fontSize="3xl" textAlign="center" style={{lineHeight:50}} bold>{(() => {
                                    if (confirmed.state === "requested") {
                                        return "Espera para iniciar la confirmación";
                                    } else if (confirmed.state === "repeat") {
                                        return "La tarea se repite";
                                    } else if (confirmed.state === 'deny') {
                                        return "la tarea fue denegada";
                                    } else if (confirmed.state === 'completed') {
                                        return "La tarea se completó";
                                    }
                                })()}</Text>
                                {
                                    ((confirmed.state === "requested") && confirmed.repeatState) ? 
                                        <Text color="#000" fontSize="4xl" textAlign="center" style={{lineHeight:50}} bold>{deadline}</Text>:null
                                }
                                
                                {
                                    confirmed.state === "repeat"?
                                        <Button w="48%" mt={5} _text={Styles.WelcomeButton} onPress={repeatHandler} borderRadius={100} bg={"#FFB61D"} alignSelf="center">Reenviar</Button> : null
                                }
                            </> :
                            photo ? <>
                                {
                                    photo.photo.type === "video" ?
                                        <Video
                                            ref={video}
                                            style={{ height: 300, alignSelf: "center", width: "80%", maxWidth: "80%", marginTop: 100, borderRadius: 15 }}
                                            source={photo.photo}
                                            useNativeControls
                                            resizeMode="contain"
                                            isLooping
                                        />
                                        : renderPhotos()
                                }
                                <HStack flex={1} justifyContent="space-between">
                                    <Button w="48%" _text={Styles.WelcomeButton} onPress={pickImage} borderRadius={100} bg={"#FFB61D"} alignSelf="center">Reiniciar</Button>
                                    <Button w="48%" _text={Styles.WelcomeButton} onPress={Save} borderRadius={100} bg={"#FFB61D"} alignSelf="center">Enviar</Button>
                                </HStack>
                            </>
                                : <>
                                    <Image source={Images.HomeCardDetail} mt={5} resizeMode="contain" alignSelf="center" />
                                    <Text color="white" fontSize="2xl" textAlign="center">Solo envia la confirmacion cuando termines la tarea y recuerda que algunas tareas tienen  tiempo limite.. </Text>
                                    <Stack flex={1} justifyContent="center">
                                        <Button _text={Styles.WelcomeButton} onPress={pickImage} borderRadius={100} bg={"#FFB61D"} alignSelf="center">Enviar confirmación</Button>
                                    </Stack>
                                </>
                    }
                </>
            }
        </Stack>
    )
}

export default HomeCardDetail;