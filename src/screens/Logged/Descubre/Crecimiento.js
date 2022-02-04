import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Avatar, Image } from 'native-base'
import { Headers, Loading } from '../../../components'
import { COLOR, db, Images, Styles } from '../../../constants'
import { useSelector } from 'react-redux'

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth);
    const [cards, setCards] = useState({});

    const LoadExchangeInfo = () => {
        setLoading(true)
        db.collection("payment_history").where("email", "==", user.email).where("cardType", "==", 'Crecimi').get().then((querySnapshot) => {
            let tempCards = {};
            querySnapshot.forEach((doc) => {
                tempCards[doc.data().cardId] = true;
            });
            setCards(tempCards);
        });
        setLoading(false)
    }

    const NextPage = (index, cardName) => {
        navigation.navigate(cards[index] ? "DescubreLandingScreen" : "DescubreDetailScreen", { type: "Crecimi", id: index, fullName: "Crecimiento personal", cardName });
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
                    <TouchableOpacity onPress={() => navigation.navigate("PerfilScreen")}>
                        <Avatar source={Images.SampleAvatar3} >
                            AK
                        </Avatar>
                    </TouchableOpacity>
                }
            />
            <Stack flex={1} px={7}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ ...Styles.WelcomeText, color: "white" }}>Crecimiento personal</Text>
                    <Stack bg={COLOR.white} px={5} m={5} borderRadius={16}>
                        <TouchableOpacity onPress={() => NextPage(0, "Aprender nueva habilidad;")}>
                            <Image source={Images.CrecimientoImage1} resizeMode="contain" my={-3} />
                        </TouchableOpacity>
                    </Stack>
                    <Stack bg={COLOR.white} px={5} m={5} borderRadius={16}>
                        <TouchableOpacity onPress={() => NextPage(1, "Empezar un nuevo projecto")}>
                            <Image source={Images.CrecimientoImage3} resizeMode="contain" mb={-2} />
                        </TouchableOpacity>
                    </Stack>
                </ScrollView>
            </Stack>
        </Box>
    )
}

export default HomeScreen