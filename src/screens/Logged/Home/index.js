import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Avatar, Button, Image } from 'native-base'
import { Headers, Loading } from '../../../components'
import { COLOR, db, Images, LAYOUT, Styles } from '../../../constants'
import { useSelector } from 'react-redux'
import { color } from 'react-native-reanimated'
import { styles } from 'styled-system'

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [cards, setCards] = useState([]);
    const [customcards, setCustomcards] = useState([]);
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
                        <Avatar source={Images.SampleAvatar3} >
                            AK
                        </Avatar>
                    </TouchableOpacity>
                }
            />
            <Stack flex={1} px={10}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text color="white" fontSize="3xl" bold textAlign="center">METAS ACTUALES</Text>
                    <Button colorScheme="blue" onPress={() => navigation.navigate("AddalarmScreen")} _text={{ fontWeight: "bold" }} bg={"#1947E5"} my={3}>CREAR NUEVA META</Button>
                    {
                        cards.map((item, i) => {
                            return <Stack key={i} ><Stack bg={COLOR.white} p={5} my={3} borderRadius={16}>
                                <TouchableOpacity onPress={() => { navigation.navigate("HomeCardDetailScreen", { ...item, cardName: LAYOUT.CardInfo[item.cardType][item.cardId].buttonText }) }}>
                                    {LAYOUT.CardInfo[item.cardType][item.cardId].CardImg}
                                    <Button onPress={() => { navigation.navigate("HomeCardDetailScreen", { ...item, cardName: LAYOUT.CardInfo[item.cardType][item.cardId].buttonText }) }} colorScheme="blue" bg="#00160A" minW={40} _text={{ fontWeight: "bold" }} alignSelf="center" borderRadius={100}>{LAYOUT.CardInfo[item.cardType][item.cardId].buttonText}</Button>
                                </TouchableOpacity>
                                </Stack>
                            </Stack>
                            
                            
                        })
                    }
                    {
                        customcards.map((item, i) => {
                            return <Stack key={i}><Stack bg={COLOR.white} p={5} mt="5" borderRadius={16}>
                                <TouchableOpacity onPress={() => { navigation.navigate("HomeCardDetailScreen", item) }}>
                                    <Image source={Images.Custom_Image} resizeMode="contain" mt={-3} />
                                    <Button onPress={() => { navigation.navigate("HomeCardDetailScreen", item) }} colorScheme="blue" bg="#00160A" minW={40} _text={{ fontWeight: "bold" }} alignSelf="center" borderRadius={100}>{item.cardName}</Button>
                                </TouchableOpacity>
                            </Stack>
                            {/* <View style={Styles.DeadlineView}><Text style={Styles.DeadlineText} >{new Date(item.created_at.seconds * 1000).toLocaleDateString("en-US")}</Text></View> */}
                            <View style={Styles.DeadlineView}><Text style={Styles.DeadlineText} >{new Date(item.created_at.seconds * 1000).toDateString()}</Text></View>
                            
                            </Stack>
                        })
                    }
                    <Box h={5}></Box>
                </ScrollView>
            </Stack >
        </Box >
    )
}

export default HomeScreen