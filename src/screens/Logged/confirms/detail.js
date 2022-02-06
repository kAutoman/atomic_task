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
            
            <Text color="#FFB61D" fontSize="2xl" textAlign="center">{CardItem.cardName}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ConfirmControlScreen",CardItem)}>
                {
                    CardItem.type === "video" ?
                        <Video
                            style={{ height: 280, marginBottom: 20, alignSelf: "center", width: "80%", maxWidth: "80%", marginTop: 70, borderRadius: 15 }}
                            source={{ uri: `${ROOT.PAYMENT_URL}img/${CardItem.photo}` }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping
                        /> :
                        <Image size="80%" h={800} mt={70} borderRadius={15} source={{ uri: `${CardItem.photo}` }} resizeMode="contain" alignSelf="center" />
                }
            </TouchableOpacity>
        </Stack >
    )
}

export default HomeCardDetail;