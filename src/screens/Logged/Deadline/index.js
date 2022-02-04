import React, { useEffect} from 'react'
import { Stack, Image } from 'native-base'
import { Images } from '../../../constants'

const App = ({}) => {

    useEffect(() => {

    }, [])

    return (
        <Stack
            flex={1}
            justifyContent="center"
            bg={"#ffffff"}
            space={20}
        >

            <Image source={Images.Deadline_Image} alignSelf="center" />
            <Image source={Images.Deadline_Text} alignSelf="center" />

        </Stack>
    )
}

export default App;