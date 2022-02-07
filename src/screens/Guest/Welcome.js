import React, { useEffect } from 'react'
import { Text, Stack, Button } from 'native-base'
import { COLOR, Styles } from '../../constants'
import { useSelector } from 'react-redux'

const Welcome = ({ navigation }) => {
    const { historyState } = useSelector((store) => store.auth);
    
    useEffect(() => {
        
        if (historyState) {
            navigation.navigate("SignInScreen");
        }
    }, [])

    
    return (
        <Stack
            flex={1}
            justifyContent="center"
            space={48}
            bg={COLOR.white}
        >
            <Stack>
                <Text style={Styles.WelcomeText}>Bienvenido</Text>
                <Text style={Styles.WelcomeText}>a</Text>
                <Text style={Styles.WelcomeText}>Atomic task</Text>
            </Stack>
            <Button _text={Styles.WelcomeButton} onPress={() => navigation.navigate("SignatureScreen")} borderRadius={16} w={"50%"} bg={COLOR.base} alignSelf="center">Vamos</Button>
        </Stack>
    )
}

export default Welcome;