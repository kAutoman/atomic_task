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
            <Image w="80%" source={Images.CrecimientoImage2} resizeMode="contain" alignSelf="center" mb={-20}/>
            <Text color={COLOR.base} fontSize="4xl" px={5}>Elige una nueva habilidad que quieras aprender y vas informandonos cada semana</Text>
            <Stack flex={1} justifyContent="center">
                <Button _text={Styles.WelcomeButton} px={8} onPress={()=>navigation.navigate("DepositoScreen")} borderRadius={100} bg={COLOR.base} alignSelf="center">Añadir tarea</Button>
            </Stack>
        </Stack>
    )
}

export default HomeCardDetail;