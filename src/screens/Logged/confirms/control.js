import React, { useState } from 'react'
import { Text, Stack, Button, Box, Image, useToast, HStack, useColorMode } from 'native-base'
import { db, Images, ROOT, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import { Loading } from '../../../components';
import { Video } from 'expo-av';
import confirmLogo from '../../../assets/confirm_control.png';
import { useSelector,useDispatch } from 'react-redux';
import { setUserInfo } from '../../../redux/actions/authActions';


const HomeCardControl = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const {item,tempIdx} = navigation.state.params;
    const CardItem = item;
    const ClickedPhotoIndex = tempIdx;
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch();

    const _handleComplete = (state) => {
        setLoading(true)

        
        //change confirmation status
        db.collection("confirmation").doc(CardItem.uid).update({
            state
        });
        let updateState = 1;
        if (state === 'completed') {
            updateState = 2;
        }
        else if (state === 'repeat') {
            updateState = 3;   
        }
        else if (state === 'deny') {
            updateState = 4;
        }
        db.collection("goals").where('cardName','==',CardItem.cardName).get().then(querySnapshot => {
            let updateId;
            querySnapshot.forEach((doc) => {
                updateId = doc.id;
            });
            db.collection("goals").doc(updateId).update({state : updateState});
        });

        if ((state === 'completed') || (state === 'repeat')) {
            //increase coin
            let coin = user.coin ? (user.coin + 5) : 5
            db.collection("users").doc(CardItem.email).update({
                coin
            }).then(()=>{
                db.collection("users").doc(CardItem.email).get().then((snapshot)=>{
                    let tempUser = snapshot.data();
                    tempUser.coin = coin;
                    dispatch(setUserInfo(tempUser));
                })
            });    
        }
         if (state === 'deny') {
            //decrease coin
            let coin = user.coin ? (user.coin - 5) : -5
            db.collection("users").doc(CardItem.email).update({
                coin
            }).then(()=>{
                db.collection("users").doc(CardItem.email).get().then((snapshot)=>{
                    let tempUser = snapshot.data();
                    tempUser.coin = coin;
                    dispatch(setUserInfo(tempUser));
                })
            });    
        }

        if (state === 'repeat') {
            let confirmedTasks = CardItem.confirmedTasks ? CardItem.confirmedTasks : [];
            confirmedTasks.push(ClickedPhotoIndex);
            db.collection("confirmation").doc(CardItem.uid).update({
                confirmedTasks
            });
        }
        
        // db.collection("payment_history").doc(CardItem.cardId).delete();
        // db.collection("goals").doc(CardItem.cardId).delete();
        setLoading(false)
        //goto confirms list
        navigation.navigate("ConfirmsScreen", 321)
    }

    const displayRepeatBtn = () => {
        if (CardItem.repeatState){
            return <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("repeat")} borderRadius={100} w="100%" bg={"#FFB61D"} alignSelf="center">Repetir</Button>;
        }
    }

    console.log(`${ROOT.PAYMENT_URL}img/${CardItem.photo[ClickedPhotoIndex]}`);

    return (
        <Stack
            flex={1}
            bg={"#000000"}
            p={7}
            pt={12}
        >
            {loading && <Loading />}
            <Box pos="absolute" zIndex={10} top={12} left={7}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.ExitImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box>
            {CardItem.type == 'image'?
                <Image size="100%" h={80} style={{marginTop:60}} borderRadius={15} source={{uri:`${ROOT.PAYMENT_URL}img/${CardItem.photo[ClickedPhotoIndex]}`}} resizeMode="contain" alignSelf="center" />:
                  <Video           
                    source={{
                      uri: `${ROOT.PAYMENT_URL}img/${CardItem.photo[ClickedPhotoIndex]}`,
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    style={{height:500,width:"100%"}}  
                  />
            }       
            <Text color="#FFB61D" fontSize="2xl" textAlign="center">{CardItem.cardName}</Text>
            {
                CardItem.state === "completed" ?
                    <Text color="white" fontSize="3xl" mt={70} textAlign="center">{"Terminada"}</Text> :
                    <Stack space={3} mt={5}>
                        <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("completed")} borderRadius={100} w="100%" bg={"#22c55e"} alignSelf="center">Completa</Button>
                        { 
                            displayRepeatBtn()
                        }
                        <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("deny")} borderRadius={100} w="100%" bg={"#f97316"} alignSelf="center">Negar</Button>
                    </Stack>
            }
        </Stack >
    )
}

export default HomeCardControl;