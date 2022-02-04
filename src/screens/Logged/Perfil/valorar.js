import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Image } from 'native-base'
import { Loading } from '../../../components'
import { COLOR, Images } from '../../../constants'

const DescubreScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    const LoadExchangeInfo = () => {
        setLoading(true)
        setLoading(false)
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.base} w='100%' pt={12}>
            {loading && <Loading />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box w={10} zIndex={10} top={5} left={5}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image zIndex={10} size="xs" source={Images.GobackImage} resizeMode="contain" />
                    </TouchableOpacity>
                </Box>
                <Stack flex={1} px={10} >
                    <Stack py={5}>
                        <Stack my={2} bg="#FFF" borderRadius={16} borderWidth={1} p={5} space={5} minH={200}>
                            <Text color="#E43434" textAlign="center" bold fontSize="4xl">Primera vez</Text>
                            <Text color="black" fontSize="3xl" bold textAlign="center">{"1. el 20% del deposito"}</Text>
                        </Stack>
                        <Stack my={2} bg="#F05D48" borderRadius={16} borderWidth={1} p={5} space={1} minH={200}>
                            <Text color="#FFF" textAlign="center" bold fontSize="4xl">Segunda</Text>
                            <Text color="black" fontSize="3xl" bold p={2} textAlign="center">{"2. el 50% del deposito"}</Text>
                        </Stack>
                        <Stack my={2} bg="#E43434" borderRadius={16} borderWidth={1} p={5} space={5} minH={200}>
                            <Text color="black" textAlign="center" bold fontSize="4xl">Game over</Text>
                            <Text color="#FFF" fontSize="3xl" bold textAlign="center">{"3. el 100% del deposito"}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </ScrollView>
        </Box>
    )
}

export default DescubreScreen