import React from 'react'
import { Text, Stack, Button, Icon } from 'native-base'
import { COLOR, Styles } from '../../constants'
import { Entypo } from '@expo/vector-icons';

const Signature_4 = ({ navigation }) => {
    return (
        <Stack
            flex={1}
            justifyContent="center"
            bg={COLOR.white}
            p={10}
        >
            <Text style={Styles.WelcomeText} mb={5}>Elige un deposito</Text>
            <Stack alignItems="center" style={Styles.PaymentBlog} shadow={6} bg={COLOR.yellow}>
                <Text style={Styles.WelcomeText}>&euro;25</Text>
                <Text color={COLOR.black}>Basic</Text>
            </Stack>
            <Stack alignItems="center" style={Styles.PaymentBlog} shadow={6} bg={COLOR.white}>
                <Text style={Styles.WelcomeText}>&euro;50</Text>
                <Text color={COLOR.black}>Standard</Text>
            </Stack>
            <Stack alignItems="center" style={Styles.PaymentBlog} shadow={6} bg={COLOR.yellow}>
                <Text style={Styles.WelcomeText}>&euro;100</Text>
                <Text color={COLOR.black}>Work-Team</Text>
            </Stack>
            <Button pr={7} mt={7} onPress={()=>navigation.navigate("Signature5Screen")} borderRadius={16} _text={Styles.WelcomeButton} w={"70%"} bg={COLOR.base} alignSelf="center">Siguiente <Icon style={{ position: "absolute", right: -30 }} color={COLOR.white} as={<Entypo name="chevron-right" />} /></Button>
        </Stack>
    )
}

export default Signature_4;