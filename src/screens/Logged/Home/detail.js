import React, {useState} from 'react'
import {Text, Stack, Button, Box, Image, HStack, useToast, View, ScrollView} from 'native-base'
import {db, Images, ROOT, Styles} from '../../../constants'
import {TouchableOpacity} from 'react-native'
import * as ImagePicker from "expo-image-picker";
import {Loading} from '../../../components';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Video} from 'expo-av';
import {style} from 'styled-system';
import moment from 'moment';
import firebase from 'firebase';


const HomeCardDetail = ({navigation}) => {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const Toast = useToast();
    const CardItem = navigation.state.params;
    const {user} = useSelector(store => store.auth);
    const [confirmed, setConfirmed] = useState(false);
    const video = React.useRef(null);
    const [isRepeat, setRepeatStatus] = useState(false);
    const [expired, setExpired] = useState(false);
    const [deadline, setDeadLine] = useState('');
    const [totalDeadline, setTotalDeadLine] = useState('');
    const [isConfirmDay, setConfirmDay] = useState(true);
    let intervalInstance;

    const checkCard = async () => {
        if (await checkDeny() === true) {
            navigation.navigate("HomeScreen",123);
            navigation.navigate("DenyScreen");
        }
        else {
            await db.collection("confirmation").where("email", "==", user.email).where("cardId", "==", CardItem.uid).get().then((querySnapshot) => {
                let tempCards = null;
                querySnapshot.forEach((doc) => {
                    tempCards = doc.data();
                });

                if(!tempCards){
                    //can't send  until start confirmday.
                    let todayWeekDayIdx =  moment().day()+1;
                    let nextDayIndex = getNextDayIndex(todayWeekDayIdx,true);
                    //validate today is first confirm day
                    if(todayWeekDayIdx !== nextDayIndex){
                        setConfirmDay(false);
                    }
                    else {
                        setConfirmDay(true);
                    }
                    setRepeatStatus(false);
                }
                else {
                    if(tempCards && (tempCards.state !== 'continue')){
                        if(tempCards){
                            if(isDelaying(tempCards)){
                                setConfirmed(tempCards);
                                calcDeadLine(tempCards);
                            }
                            else {
                                if (moment().format('YYYY-MM-DD') === moment(tempCards.updated_at.toDate()).format('YYYY-MM-DD')){
                                    tempCards.repeatState = false;
                                    setConfirmed(tempCards);
                                }
                                else {
                                    setConfirmed(false);   
                                }
                            }
                        }
                    }
                    else if(tempCards && (tempCards.totalConfirmCnt === tempCards.photo.length)){
                        tempCards.repeatState = false;
                        tempCards.state = 'requested';
                        setConfirmed(tempCards);
                    }
                    else {
                        setConfirmed(false);
                        setRepeatStatus(true);
                    }
                }
    
                setLoading(false);
            });
        }
        
    }

    const checkDeny = async () => {
    
        let start;
        if ( CardItem.updated_at) {
            start =  CardItem.updated_at.toDate().setHours(0,0,0);
        }
        else {
            start = CardItem.created_at.toDate().setHours(0,0,0);
        }
        const end = new Date().setHours(0,0,0);
        
            
        let loop = new Date(start);
        //include today and last day
        let checkCnt = 2;
        let todayIndex = loop.getDay()+1;
        //if today is confirm day
        if(CardItem.repeatDays.indexOf(todayIndex) > -1){
            checkCnt = 3;
        }
        let totalCnt = 0;
        while (loop <= end) {
            
            let temp = loop.getDay()+1;
            if(CardItem.repeatDays.indexOf(temp) > -1){
                totalCnt++;
            }
            //if didn't send on day.
            
            if(totalCnt >= checkCnt){
                await db.collection("confirmation").where("email", "==", user.email).where("cardId", "==", CardItem.uid).get().then((querySnapshot) => {
                    let tempCards = null;
                    querySnapshot.forEach((doc) => {
                        tempCards = doc.data();
                        tempCards.uid = doc.id
                    });
                    if(tempCards){
                        db.collection("confirmation").doc(tempCards.uid).update({state:'deny'});
                    }
                });
                await db.collection("goals").doc(CardItem.uid).update({state:4});
                return true;
            }
            
            let newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
        }
        
        return false;
    }


    useEffect(() => {
    
        if (!isExpired()){
            checkCard();
        }
        else{
            setConfirmed(false);
            setLoading(false);
        }
        
        return () => {
            clearInterval(intervalInstance);
        }
    }, [navigation])

    const pickImage = async (repeating = false) => {
        if(repeating) {
            setRepeatStatus(true);
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            setConfirmed(false);
            let temp = result.uri.split(/\//g);
            let tempName = temp[temp.length-1];
            let tempExtArr = tempName.split(/\./g);
            let resultExt = tempExtArr[tempExtArr.length-1];
            const imageUrl = await uploadImageAsync(result.uri,resultExt);
            return setPhoto({
                uri: imageUrl,
                type : result.type
            });
        }
    };


    const uploadImageAsync = async (uri,extension) => {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.error(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });

        setLoading(true);

        const timeStamp = Math.floor(Date.now() / 1000);
        const insertKey = "_" + timeStamp;
      
        const ref = firebase
          .storage()
          .ref()
          .child(`tasks/${insertKey}.${extension}`);
        const snapshot = await ref.put(blob);
      
        // We're done with the blob, close and release it
        blob.close();

        setLoading(false);
      
        return await snapshot.ref.getDownloadURL();
    }



    const renderPhotos = () => {
        if (confirmed) {
            return <Image size="100%" h={400} mt={70} source={Images.DelayImage} resizeMode="contain"
                          alignSelf="center"/>;
        } else {
            return <Image size="100%" h={500} borderRadius={15} mt={50} source={{uri:photo.uri}}
                          resizeMode="contain" alignSelf="center"/>
        }
    }

    const isDelaying = (confirm) => {
        const todayWeekIndex =  moment().day()+1;
    
        if(confirm){
            if(confirm.totalConfirmCnt === confirm.photo.length){
                return false;
            }
            if(todayWeekIndex === confirm.lastConfirmDay){
                if (moment().format('YYYY-MM-DD') === moment(confirm.updated_at.toDate()).format('YYYY-MM-DD')){
                    return true;
                }
                else {
                    setRepeatStatus(true);
                    setExpired(true);
                    return false;
                }
            }
        }
        let dayArr = [];
        for(let tmp of confirm.day){
            if(tmp >= todayWeekIndex){
                dayArr.push(tmp);
            }
        }
        
        
        dayArr.sort(function(a, b){return a - b});

        if (confirm.lastConfirmDay + getDiffDay(confirm.lastConfirmDay) <= todayWeekIndex){
            setExpired(true);
            setRepeatStatus(true);
            setTimeout(function(){
                return false;
            },1000);
        }
        else {
            if(dayArr.indexOf(todayWeekIndex) > -1 ){
                setExpired(true);
                setRepeatStatus(true);
                return false;
            }

            return true;
        }
    }


    const isExpired = () => {

        //when task status is denied show denied screen
        if(CardItem.state === 4) {
            navigation.navigate("HomeScreen",123);
            navigation.navigate("DenyScreen");
            return false;
        }
        
        if(CardItem.deadline){
          
            if(new Date() > new Date(CardItem.deadline.toDate().setHours(23,59,59))){
                return true;
            }
        }
        
       
        return false;
        
    }

    const getNextDayIndex = (todayWeekDayIdx,isInitial) => {
        let nextDayIndex=todayWeekDayIdx;
        let newDays = [];
        if (CardItem.repeatDays){
            if(isInitial){
                for(let repeatDay of CardItem.repeatDays){
                    if (repeatDay >= todayWeekDayIdx) {
                        newDays.push(repeatDay);
                    }
                }
            }
            else {
                for(let repeatDay of CardItem.repeatDays){
                    if (repeatDay > todayWeekDayIdx) {
                        newDays.push(repeatDay);
                    }
                }    
            }
            
            newDays.sort(function(a, b){return a - b});
            if (newDays.length > 0) {
                nextDayIndex = newDays[0];
            }
        
            //if the end of week
            if (nextDayIndex === -1) {
                //get first day index of next week
                let temp=-1;
                CardItem.repeatDays.sort(function(a, b){return a - b});
                nextDayIndex = CardItem.repeatDays[0];
            }
    
        }
        
        return nextDayIndex;
    }

    const getDiffDay = (startDay) => {
        let todayWeekDayIdx;
        if (startDay) {
            todayWeekDayIdx = startDay;
        }
        else {
            todayWeekDayIdx =  moment().day()+1;
        }
        
        let nextDayIndex = getNextDayIndex(todayWeekDayIdx);

         //get diff days
         let diffDays = -1;
         if (todayWeekDayIdx < nextDayIndex) {
            diffDays = nextDayIndex - todayWeekDayIdx;
         }
         else {
            diffDays = 7 - todayWeekDayIdx + nextDayIndex;
         }

         return diffDays;
    }

    

    const getDeadLine = (confirm) => {

        if(!isDelaying(confirm)){
            setRepeatStatus(false);
            return setConfirmed(confirm);
        }
      
        let diffDays = getDiffDay();
        let date1 = moment(moment().add(diffDays, 'days').format('YYYY-MM-DD 00:00:00'));
        let date2 = moment();
        let diff = moment.duration(date1.diff(date2));

    
        setTotalDeadLine(diff.get("days") + 'd ' + diff.get("hours") + "h " + diff.get("minutes") + "m " + diff.get("seconds") + 's ');

        let date3 = moment(CardItem.deadline.toDate());

        let diff1 = moment.duration(date3.diff(date2));

        let dayDiff = date3.diff(date2, 'days');
        
        setDeadLine(dayDiff + 'd ' + diff1.get("hours") + "h " + diff1.get("minutes") + "m " + diff1.get("seconds") + 's ');
    }

    const calcDeadLine = (temp) => {
        if(temp.repeatState){
            intervalInstance = setInterval(() => getDeadLine(temp), 1000)
        }
    }

    const Save = async () => {
        if (photo) {
            setLoading(true);
            await db.collection("users").where("email", "==", user.email).get().then(async (querySnapshot) => {
                const timeStamp = Math.floor(Date.now() / 1000);
                const insertKey = "_" + timeStamp;
                let userInfo = "";
                querySnapshot.forEach((doc) => {
                    userInfo = doc.data();
                });

                if (isRepeat) { //when repeat button has clicked

                    db.collection("confirmation").where("email", "==", user.email).where("cardId", "==", CardItem.uid).get().then((querySnapshot) => {
                        let tempCards = null;
                        querySnapshot.forEach((doc) => {
                            tempCards = doc.data();
                            tempCards.uid = doc.id
                        });
                        
                        if(!tempCards){ 
                            tempCards.photo.push(photo.uri);
                        }
                        else {
                            if ((tempCards.state === 'continue') || expired) {
                                //push photo
                                tempCards.photo.push(photo.uri);
                            } else {
                                //replace last photo
                                tempCards.photo[tempCards.photo.length - 1] = photo.uri;
                            }
                        }
                        
                        let todayWeekDayIdx = moment().day()+1;
                        tempCards.lastConfirmDay = todayWeekDayIdx;

                        tempCards.type = photo.type,
                        tempCards.state = "requested";
                        tempCards.updated_at = new Date();
                        db.collection("confirmation").doc(tempCards.uid).update(tempCards);
                        
                        db.collection("goals").doc(CardItem.uid).update({state:1,updated_at : new Date()});
                        navigation.navigate("HomeScreen",123);
                    });
                } else {
                    let day = [];
                    if (CardItem.repeatState) {
                        Object.entries(CardItem.repeatDays).forEach((value) => {
                            day.push(value[1]);
                        });   
                    }
                    let todayWeekDayIdx = moment().day()+1;
                    let saveData = {
                        email: user.email,
                        username: userInfo.name,
                        photo: [photo.uri],
                        type: photo.type,
                        cardId: CardItem.uid,
                        cardName: CardItem.cardName,
                        amount: CardItem.amount ? CardItem.amount : 0,
                        totalConfirmCnt:CardItem.totalConfirmCnt ? CardItem.totalConfirmCnt : 0,
                        day,
                        state: "requested",
                        lastConfirmDay : todayWeekDayIdx,
                        repeatState: CardItem.repeatState?CardItem.repeatState : false,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }
                
                    await db.collection('confirmation').doc(insertKey).set(saveData);
                    await db.collection("goals").doc(CardItem.uid).update({updated_at : new Date()});
                    navigation.navigate("HomeScreen",123);
                }
            });
        }
        setLoading(false)       
    }

    return (
       <Stack
            flex={1}
            bg={confirmed ? "#fff" : "#000"}
            p={7}
        >
            {loading ? <Loading/> :
                <>
                    <Box pos="absolute" zIndex={10} top={12} left={7}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={Images.ExitImage} resizeMode="contain"/>
                        </TouchableOpacity>
                    </Box>
                    {
                        (confirmed ?
                            <>
                                {
                                    renderPhotos()
                                }


                                <Text color="#000" fontSize="3xl" textAlign="center"
                                      style={{lineHeight: 50, marginTop: 40}} bold>{(() => {
                                    if ((confirmed.state === 'requested') && !confirmed.repeatState) {
                                        return "La tarea esta en revision espera el resultado";
                                    } else if (confirmed.state === 'repeat') {
                                        return "La tarea se repite";
                                    } else if (confirmed.state === 'continue') {
                                        return "La tarea se continúa";
                                    } else if (confirmed.state === 'deny') {
                                        return "la tarea fue denegada";
                                    } else if (confirmed.state === 'completed') {
                                        return "La tarea se completó";
                                    }
                                })()}</Text>
                                {
                                    ((confirmed.state === 'requested') && confirmed.repeatState) ?
                                        <Text color="#000" fontSize="3xl" textAlign="center" style={{lineHeight: 50}}
                                              bold>Fetcha de expiracion {'\n' + deadline} </Text> : null
                                }

                                {
                                    ((confirmed.state === 'requested') && confirmed.repeatState) ?
                                        <Text color="#000" fontSize="3xl" textAlign="center" style={{lineHeight: 50}}
                                              bold>Siguiente confirmacion {'\n' + totalDeadline} </Text> : null
                                }

                                {
                                    confirmed.state === 'repeat' ?
                                        <Button w="48%" mt={5} _text={Styles.WelcomeButton} onPress={()=>pickImage(true)}
                                                borderRadius={100} bg={"#FFB61D"}
                                                alignSelf="center">Reenviar</Button> : null
                                }
                                {
                                    confirmed.state === 'continue' ?
                                        <Button w="48%" mt={5} _text={Styles.WelcomeButton} onPress={()=>pickImage(true)}
                                                borderRadius={100} bg={"#00A1E0"}
                                                alignSelf="center">Continuar</Button> : null
                                }
                            </> :
                            photo ? <>
                                    {
                                        
                                        photo.type === "video" ?
                                            <Video
                                                ref={video}
                                                style={{
                                                    height: 300,
                                                    alignSelf: "center",
                                                    width: "80%",
                                                    maxWidth: "80%",
                                                    marginTop: 100,
                                                    borderRadius: 15
                                                }}
                                                source={{uri:photo.uri}}
                                                useNativeControls
                                                resizeMode="contain"
                                                isLooping
                                            />
                                            : renderPhotos()
                                    }
                                    <HStack flex={1} justifyContent="space-between">
                                        <Button w="48%" _text={Styles.WelcomeButton} onPress={()=>pickImage(false)} borderRadius={100}
                                                bg={"#FFB61D"} alignSelf="center">Reiniciar</Button>
                                        <Button w="48%" _text={Styles.WelcomeButton} onPress={Save} borderRadius={100}
                                                bg={"#FFB61D"} alignSelf="center">Enviar</Button>
                                    </HStack>
                                </>
                                : <>
                                    <Image source={Images.HomeCardDetail} mt={5} resizeMode="contain" alignSelf="center"/>
                                    <Text color="white" fontSize="2xl" textAlign="center">Solo envia la confirmacion cuando
                                        termines la tarea y recuerda que algunas tareas tienen tiempo limite.. </Text>
                                    <Stack flex={1} justifyContent="center">
                                    {
                                        isConfirmDay ?
                                        <Button _text={Styles.WelcomeButton} onPress={()=>pickImage(false)} borderRadius={100}
                                                bg={"#FFB61D"} alignSelf="center">Enviar confirmación</Button>
                                        :<Text color="white" fontSize="2xl" textAlign="center">Por favor espere hasta el día de confirmación</Text>
                                    }
                                    </Stack>
                                </>)
                    }
                </>
            }
        </Stack>
    )
}

export default HomeCardDetail;
