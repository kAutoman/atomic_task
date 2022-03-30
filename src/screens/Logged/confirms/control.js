import React, { useState,useEffect } from 'react'
import { Text, Stack, Button, Box, Image, useToast, HStack, useColorMode } from 'native-base'
import { db, Images, ROOT, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import { Loading } from '../../../components';
import { Video } from 'expo-av';
import { useSelector,useDispatch } from 'react-redux';
import { setUserInfo } from '../../../redux/actions/authActions';


const HomeCardControl = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const {item,tempIdx} = navigation.state.params;
    const CardItem = item;
    const ClickedPhotoIndex = tempIdx;
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch();
    const [goalItem,setGoal] = useState({});

    const getGoal = () => {
        db.collection("goals").where('cardName','==',CardItem.cardName).get().then(querySnapshot => {
            let goal;
            querySnapshot.forEach((doc) => {
                goal = doc.data();
                goal.id = doc.id;
            });
            setGoal(goal);
        });
    }

    const _handleComplete = (state) => {
        setLoading(true)
        let confirmCnt = CardItem.confirmed ? CardItem.confirmed : 0;
        if((state === 'continue') || (state ==='completed')){
            confirmCnt++;
        }

        if (CardItem.repeatState && CardItem.photo.length !== CardItem.totalConfirmCnt) {
            state = CardItem.state
        }
         //change confirmation status
         db.collection("confirmation").doc(CardItem.uid).update({
            state,
            confirmed : confirmCnt,
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
        else if (state === 'continue') {
            updateState = 5;
        }
        if(goalItem){
            if(CardItem.repeatState){
                if (CardItem.photo.length !== CardItem.totalConfirmCnt) {
                    db.collection("goals").doc(goalItem.id).update({state : updateState});
                }
            }else {
                db.collection("goals").doc(goalItem.id).update({state : updateState});  
            }
        }
        
        if (state === 'completed') {
            //increase coin
            db.collection("users").doc(CardItem.email).get().then((snapshot)=>{
                    let tempUser = snapshot.data();
                    let coin = tempUser.coin;
                    let oppotunity = tempUser.oppotunity;
                    if(CardItem.amount > 0){ //if not bonus mode.
                        oppotunity = tempUser.oppotunity ? (tempUser.oppotunity + 1) : 1
                        coin = tempUser.coin ? (tempUser.coin + 5) : 5;
                    }
                    db.collection("users").doc(CardItem.email).update({
                        coin,
                        oppotunity
                    }).then(()=>{
                        if(CardItem.email === user.email) {
                            db.collection("users").doc(CardItem.email).get().then((snapshot)=>{
                                let tempUser = snapshot.data();
                                tempUser.coin = coin;
                                tempUser.oppotunity = oppotunity;
                                dispatch(setUserInfo(tempUser));
                            })
                        }
                    });
            });
            
        }

        if (state === 'deny') {
            //increase coin
            db.collection("users").doc(CardItem.email).get().then((snapshot)=>{
                    let tempUser = snapshot.data();
                    let currentBond = tempUser.currentBond;
                    console.log(currentBond);
                    console.log(CardItem.amount);
                    if(CardItem.amount > 0){
                        currentBond = tempUser.currentBond ? (tempUser.currentBond - CardItem.amount) : -CardItem.amount;
                    }
                    db.collection("users").doc(CardItem.email).update({
                        currentBond
                    }).then(()=>{
                        if(CardItem.email === user.email) {
                            db.collection("users").doc(CardItem.email).get().then((snapshot)=>{
                                let tempUser = snapshot.data();
                                tempUser.currentBond = currentBond;
                                dispatch(setUserInfo(tempUser));
                            })
                        }
                    });
            });
            
        }

        if (state === 'continue') {
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

    const renderContinueButton = () => {
        if (CardItem.repeatState && !CardItem.confirmed){
            CardItem.confirmed = 0;
        }
        if (!CardItem.repeatState){
            return <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("completed")} borderRadius={100} w="100%" bg={"#34C759"} alignSelf="center">Complete</Button>
        }
        if(CardItem.confirmed === (CardItem.totalConfirmCnt-1)){
            return <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("completed")} borderRadius={100} w="100%" bg={"#34C759"} alignSelf="center">Complete</Button>   
        }
        if(CardItem.repeatState){
            return <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("continue")} borderRadius={100} w="100%" bg={"#00A1E0"} alignSelf="center">Continuar</Button>
        }
    }

    useEffect(() => {
        getGoal();
    })


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
                <Image size="100%" h={80} style={{marginTop:60}} borderRadius={15} source={{uri:CardItem.photo[ClickedPhotoIndex]}} resizeMode="contain" alignSelf="center" />:
                  <Video           
                    source={{
                      uri: CardItem.photo[ClickedPhotoIndex],
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    style={{height:400,width:"100%"}}  
                  />
            }       
            <Text color="#FFB61D" fontSize="2xl" textAlign="center">{CardItem.cardName}</Text>
            {
                CardItem.state === "completed" ?
                    <Text color="white" fontSize="3xl" mt={70} textAlign="center">{"Terminada"}</Text> :
                    <Stack space={3} mt={5}>
                        {
                            renderContinueButton()
                        }
                        <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("repeat")} borderRadius={100} w="100%" bg={"#FFB61D"} alignSelf="center">Repetir</Button>
                        <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("deny")} borderRadius={100} w="100%" bg={"#f97316"} alignSelf="center">Negar</Button>
                    </Stack>
            }
        </Stack >
    )
}

export default HomeCardControl;