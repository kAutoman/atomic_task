import React from 'react'
import { Text, Stack, Button, Box, Image } from 'native-base'
import { COLOR, Images, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'

const HomeCardDetail = ({ navigation }) => {
    return (
        <Stack
            flex={1}
            bg={"#000"}
            p={7}
            pt={12}
        >
            <Box pos="absolute" zIndex={10} top={12} left={7}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.ExitImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box>
            <Image w="70%" source={Images.DescubreLanding} resizeMode="contain" alignSelf="center" my={10}/>
            <Text color={COLOR.white} fontSize="4xl" textAlign="center">Revisa el inicio los tienes activado</Text>
            <Stack flex={1} justifyContent="center">
                <Button _text={{...Styles.WelcomeButton,color:"white"}} onPress={() => navigation.navigate("HomeScreen")} borderRadius={100} px={10} bg="#ED0006" alignSelf="center">Ir al inicio</Button>
            </Stack>
        </Stack>
    )
}

export default HomeCardDetail;