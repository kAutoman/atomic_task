import React from 'react'
import { Text, Stack, Button, Box, Image } from 'native-base'
import { COLOR, Images, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'

const HomeCardDetail = ({ navigation }) => {
    return (
        <Stack
            flex={1}
            bg={"#fff"}
            p={7}
        >
            <Box pos="absolute" zIndex={10} top={5} left={7}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={Images.ExitImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box>
            <Image w="80%" source={Images.HomeImage1} resizeMode="contain" alignSelf="center" />
            <Text color={COLOR.base} fontSize="4xl" textAlign="center">Deja el el movil en un lugar comodo y dale click a grabar</Text>
            <Stack flex={1} justifyContent="center">
                <Button _text={Styles.WelcomeButton} onPress={()=>navigation.navigate("DescubreLandingScreen")} borderRadius={100} bg={COLOR.base} alignSelf="center">Añadir tarea</Button>
            </Stack>
        </Stack>
    )
}

export default HomeCardDetail;