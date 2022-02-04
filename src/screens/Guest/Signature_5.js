import React from 'react'
import { Text, Stack, Button, Icon, Image } from 'native-base'
import { COLOR, Images, Styles } from '../../constants'
import { Entypo } from '@expo/vector-icons';

const Signature_4 = ({ navigation }) => {
    return (
        <Stack
            flex={1}
            justifyContent="center"
            bg={COLOR.grey}
            p={7}
        >
            <Text style={Styles.GuestText} color={COLOR.white}>Sino haces</Text>
            <Text style={Styles.GuestText} color={COLOR.white}>esa tarea</Text>
            <Text style={Styles.GuestText} color={COLOR.white}>perderas el</Text>
            <Text style={Styles.GuestText} color={"#FF6060"}>deposito</Text>
            <Image source={Images.PigWallet} alignSelf="center" />
            <Text style={Styles.GuestText} color={COLOR.white}>Simple</Text>
            <Text style={Styles.GuestText} color={COLOR.white}>¿verdad?</Text>

            <Button pr={7} mt={7} _text={{...Styles.WelcomeButton,color:"black"}} w={"70%"} variant="ghost" borderRadius={16} onPress={()=>navigation.navigate("SignInScreen")} bg={COLOR.white} alignSelf="center">Siguiente <Icon style={{ position: "absolute", right: -30 }} color={COLOR.black} as={<Entypo name="chevron-right" />} /></Button>
        </Stack>
    )
}

export default Signature_4;