import React, { useState } from 'react'
import { Text, Stack, Button, Box, Image, useToast, HStack } from 'native-base'
import { db, Images, ROOT, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import { Loading } from '../../../components';
import { Video } from 'expo-av';


const HomeCardDetail = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const CardItem = navigation.state.params;

    const _handleComplete = (state) => {
        setLoading(true)
        db.collection("confirmation").doc(CardItem.uid).update({
            state
        });
        // db.collection("payment_history").doc(CardItem.cardId).delete();
        // db.collection("goals").doc(CardItem.cardId).delete();
        setLoading(false)
        navigation.navigate("ConfirmsScreen", 321)
    }

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
            {
                CardItem.type === "video" ?
                    <Video
                        style={{ height: 280, marginBottom: 20, alignSelf: "center", width: "80%", maxWidth: "80%", marginTop: 70, borderRadius: 15 }}
                        source={{ uri: `${ROOT.PAYMENT_URL}img/${CardItem.photo}` }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                    /> :
                    <Image size="80%" h={300} mt={70} borderRadius={15} source={{ uri: `${ROOT.PAYMENT_URL}img/${CardItem.photo}` }} resizeMode="contain" alignSelf="center" />
            }
            <Text color="#FFB61D" fontSize="2xl" textAlign="center">{CardItem.cardName}</Text>
            {
                CardItem.state === "completed" ?
                    <Text color="white" fontSize="3xl" mt={70} textAlign="center">{"Terminada"}</Text> :
                    <Stack space={3} mt={5}>
                        <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("completed")} borderRadius={100} w="100%" bg={"#22c55e"} alignSelf="center">Completa</Button>
                        <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("repeat")} borderRadius={100} w="100%" bg={"#FFB61D"} alignSelf="center">Repetir</Button>
                        <Button _text={Styles.WelcomeButton} onPress={() => _handleComplete("deny")} borderRadius={100} w="100%" bg={"#f97316"} alignSelf="center">Negar</Button>
                    </Stack>
            }
        </Stack >
    )
}

export default HomeCardDetail;