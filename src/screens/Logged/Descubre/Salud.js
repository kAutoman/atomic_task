import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Avatar, Button, Image } from 'native-base'
import { Headers, Loading } from '../../../components'
import { COLOR, db, Images, Styles } from '../../../constants'
import { useSelector } from 'react-redux'

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth);
    const [cards, setCards] = useState({});

    const LoadExchangeInfo = () => {
        setLoading(true)
        db.collection("payment_history").where("email", "==", user.email).where("cardType", "==", 'Salud').get().then((querySnapshot) => {
            let tempCards = {};
            querySnapshot.forEach((doc) => {
                tempCards[doc.data().cardId] = true;
            });
            setCards(tempCards);
        });
        setLoading(false)
    }

    const NextPage = (index, cardName) => {
        navigation.navigate(cards[index] ? "DescubreLandingScreen" : "DescubreDetailScreen", { type: "Salud", id: index, fullName: "Salud", cardName });
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.base} w='100%'>
            {loading && <Loading />}
            <Headers
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                    </TouchableOpacity>
                }
                right={
                    <TouchableOpacity>
                        <Avatar source={Images.SampleAvatar3} >
                            AK
                        </Avatar>
                    </TouchableOpacity>
                }
            />
            <Stack flex={1} px={10}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ ...Styles.WelcomeText, color: "white" }}>Salud</Text>
                    <Stack bg={COLOR.white} p={5} my={3} borderRadius={16}>
                        <TouchableOpacity onPress={() => NextPage(0, "Bajar peso")}>
                            <Image source={Images.HomeImage1} resizeMode="contain" mb={3} />
                            <Button colorScheme="blue" onPress={() => NextPage(0)} bg="#00160A" w={40} _text={{ fontWeight: "bold" }} alignSelf="center" borderRadius={100}>Bajar peso</Button>
                        </TouchableOpacity>
                    </Stack>
                    <Stack bg={COLOR.white} p={5} my={3} borderRadius={16}>
                        <TouchableOpacity onPress={() => NextPage(1, "Práctica deporte")}>
                            <Image source={Images.SaludImage1} resizeMode="contain" mt={-5} />
                            <Button colorScheme="blue" onPress={() => NextPage(1)} bg="#00160A" w={40} _text={{ fontWeight: "bold" }} alignSelf="center" borderRadius={100}>Práctica deporte</Button>
                        </TouchableOpacity>
                    </Stack>
                </ScrollView >
            </Stack >
        </Box >
    )
}

export default HomeScreen