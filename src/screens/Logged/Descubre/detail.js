import React, { useState } from 'react'
import { Text, Stack, Button, Box, Image } from 'native-base'
import { COLOR, Images, Styles, LAYOUT } from '../../../constants'
import { TouchableOpacity } from 'react-native'

const HomeCardDetail = ({ navigation }) => {
    const [cardInfo, setCardInfo] = useState(navigation.state.params);

    return (
        <Stack
            flex={1}
            bg={"#fff"}
            p={7}
            pt={12}
        >
            <Box pos="absolute" zIndex={10} top={12} left={7}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.ExitImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box>
            {LAYOUT.CardInfo[cardInfo.type][cardInfo.id].img}
            <Text color={COLOR.base} fontSize="4xl" textAlign="center">{LAYOUT.CardInfo[cardInfo.type][cardInfo.id].Text}</Text>
            <Stack flex={1} justifyContent="center">
                <Button _text={Styles.WelcomeButton} px={10} onPress={() => navigation.navigate("DepositoScreen", cardInfo)} borderRadius={100} bg={COLOR.base} alignSelf="center">Añadir tarea</Button>
            </Stack>
        </Stack>
    )
}

export default HomeCardDetail;