import React from 'react'
import { Text, Stack, Button, Icon } from 'native-base'
import { COLOR, Styles } from '../../constants'
import { Entypo } from '@expo/vector-icons';

const Signature = ({ navigation }) => {
    return (
        <Stack
            flex={1}
            justifyContent="center"
            space={48}
            bg={COLOR.white}
            p={10}
        >
            <Stack>
                <Text style={Styles.WelcomeText}>La incertidumbre y perder lo actual</Text>
            </Stack>
            <Button pr={7} onPress={()=>navigation.navigate("Signature2Screen")} borderRadius={16} _text={Styles.WelcomeButton} w={"70%"} bg={COLOR.base} alignSelf="center">Siguiente <Icon style={{ position: "absolute", right: -30 }} color={COLOR.white} as={<Entypo name="chevron-right" />} /></Button>
        </Stack>
    )
}

export default Signature;