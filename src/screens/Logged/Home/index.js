import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Avatar, Button, Image } from 'native-base'
import { Headers, Loading } from '../../../components'
import { COLOR, db, Images, LAYOUT, Styles } from '../../../constants'
import { useSelector,useDispatch } from 'react-redux'
import moment from 'moment'
import {setUserInfo} from "../../../redux/actions/authActions";


const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [cards, setCards] = useState([]);
    const [customcards, setCustomcards] = useState([]);
    const dispatch = useDispatch();
    const LoadExchangeInfo = () => {
        setLoading(true)
        db.collection("payment_history").where("email", "==", user.email).get().then((querySnapshot) => {
            let tempCards = [];
            querySnapshot.forEach((doc) => {
                tempCards.push({ ...doc.data(), uid: doc.id });
            });
            setCards(tempCards);
        });
        db.collection("goals").where("user", "==", user.email).get().then((querySnapshot) => {            
            let tempCards = [];
            querySnapshot.forEach((doc) => {                
                tempCards.push({ ...doc.data(), uid: doc.id });                
            });
            setCustomcards(tempCards);
            setLoading(false)
        });

        db.collection("users").doc(user.email).get().then((snapshot)=>{
            let tempUser = snapshot.data();
            dispatch(setUserInfo(tempUser));
        })

    }

    // console.log(moment() < moment().add(1,'days'));

    const deleteGoal = (item) => {
        db.collection("goals").doc(item.uid).delete();
        db.collection("confirmation").where("cardName",'==', item.cardName).get().then((querySnapshot) => {            
            querySnapshot.forEach((doc) => {                
                doc.ref.delete();
            });
            LoadExchangeInfo();
        });
    }

    const determineDetail = (item) => {
        let todayDayIndex = parseInt(moment().format('d'))+1;
        let isGoalDay = false;
        if (item.repeatDays.indexOf(todayDayIndex) > -1) {
            isGoalDay = true;
        }


        if(new Date() > new Date(item.deadline.toDate())){
            return 'outdated';
        }
        // else if(!isGoalDay) {
        //     return 'outdated';
        // }
        else {
            return 'normal';
        }
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation.state.params])

    return (
        <Box flex={1} bg={COLOR.base} w='100%'>
            {loading && <Loading />}
            <Headers
                left={
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Image size="xs" source={Images.NavBarImage} />
                    </TouchableOpacity>
                }
                right={
                    <TouchableOpacity onPress={() => navigation.navigate("PerfilScreen")}>
                        <Avatar source={Images.SampleAvatar3}  >
                           
                        </Avatar>
                        <Text color="#fff" fontSize="md" width={20} >{user.coin ? user.coin : 0} catd</Text>
                    </TouchableOpacity>
                }
            />
            <Stack flex={1} px={10}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text color="white" fontSize="3xl" bold textAlign="center">METAS ACTUALES</Text>
                    {/* create a task menu */}
                    <Button colorScheme="blue" onPress={() => navigation.navigate("CreateTaskScreen")} _text={{ fontWeight: "bold" }} bg={"#1947E5"} my={3}>CREAR NUEVA META</Button>
                    {
                        cards.map((item, i) => {
                            // if(item.state == 1 || item.state == 1){
                                return <Stack key={i} ><Stack bg={COLOR.white} p={5} my={3} borderRadius={16}>
                                    <TouchableOpacity onPress={() => { navigation.navigate("HomeCardDetailScreen", { ...item, cardName: LAYOUT.CardInfo[item.cardType][item.cardId].buttonText }) }}>
                                        {LAYOUT.CardInfo[item.cardType][item.cardId].CardImg}
                                        <Button onPress={() => { navigation.navigate("HomeCardDetailScreen", { ...item, cardName: LAYOUT.CardInfo[item.cardType][item.cardId].buttonText }) }} colorScheme="blue" bg="#00160A" minW={40} _text={{ fontWeight: "bold" }} alignSelf="center" borderRadius={100}>{LAYOUT.CardInfo[item.cardType][item.cardId].buttonText}</Button>
                                    </TouchableOpacity>
                                    </Stack>
                                </Stack>       
                            // }       
                        })
                    }
                    {
                        customcards.map((item, i) => {  

                            // if(item.state == 0 || item.state == 1){
                                return <Stack key={i}><Stack bg={COLOR.white} mt="5" borderRadius={16}>
                                    <TouchableOpacity onPress={() => { determineDetail(item) === 'normal' ? navigation.navigate("HomeCardDetailScreen", item):navigation.navigate("DeadlineScreen", item) }}>
                                        <Image source={Images.Custom_Image} resizeMode="contain" />
                                        <Button mb={5} onPress={() => { new Date() < new Date(item.deadline.toDate())? navigation.navigate("HomeCardDetailScreen", item):navigation.navigate("DeadlineScreen", item) }} colorScheme="blue" bg="#00160A" minW={40} _text={{ fontWeight: "bold"}} alignSelf="center" borderRadius={100}>{item.cardName}</Button>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{zIndex:1,position:"absolute",top:10,right:10}} onPress={() => {deleteGoal(item)}}>
                                        <Image mb={3} width={30} height={30} style={((new Date() < new Date(item.deadline.toDate())) && (item.state !== 4)) && {display:"none"}} source={Images.TrashImage} resizeMode="contain" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Styles.ComprarButton} onPress={() => { determineDetail(item) === 'normal' ? navigation.navigate("HomeCardDetailScreen", item):navigation.navigate("DeadlineScreen", item) }}>
                                        <Text mb={3} color="white" textAlign="center" bold>{item.deadline && new Date(item.deadline.seconds * 1000).toDateString()}</Text>
                                    </TouchableOpacity>
                                  
                                </Stack>
                            </Stack>
                            // }                          
                        })
                    
                    }
                    <Box h={5}></Box>
                </ScrollView>
            </Stack >
        </Box >
    )
}

export default HomeScreen