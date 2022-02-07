import { Box, Button, Image, ScrollView, Stack, Text, View} from 'native-base'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Loading } from '../../../components'
import { COLOR, db, Images, Styles } from '../../../constants'

const Challenge1Screen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    return (
        <Box flex={1} bg={COLOR.white} w='100%' pt={10}>
            {loading && <Loading />}
            <Box w={10} zIndex={10} top={5} left={5}>
                <TouchableOpacity onPress={() => navigation.navigate("ChallengeScreen")}>
                    <Image zIndex={10} size="xs" source={Images.GobackImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box>
            <Stack flex={1} px={10} >
                <Text mb={3} color="black" fontSize="4xl" textAlign="center" bold>Desafíos</Text>                
                <Stack py={5} flex={1}>                    
                    <TouchableOpacity onPress={() => navigation.navigate("Challenge2Screen")} style={Styles.Challenge21Button}>
                        <Text fontSize="30" color="#FFB61D" bold>21 DIAS DE</Text>
                        <Text fontSize="30" color="#FFB61D" bold>EJERCICIOS</Text>
                    </TouchableOpacity>                       
                </Stack>
            </Stack>
            
        </Box>
    )
}

export default Challenge1Screen