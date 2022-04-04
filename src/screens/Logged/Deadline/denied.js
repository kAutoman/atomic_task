import React, { useEffect} from 'react'
import { Stack, Image,Text } from 'native-base'
import { Images } from '../../../constants'

const Deny = ({}) => {

    useEffect(() => {

    }, [])

    return (
        <Stack
            flex={1}
            justifyContent="center"
            bg={"#ffffff"}
            space={20}
        >

            <Image source={Images.DelayImage} alignSelf="center" />
            <Text color="#000" fontSize="3xl" textAlign="center" style={{lineHeight: 50, marginTop: 40}} bold>
                la tarea fue denegada
            </Text>

        </Stack>
    )
}

export default Deny;