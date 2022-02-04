import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Avatar, Image, HStack } from 'native-base'
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
        <Box flex={1} bg="#231F20" w='100%' pt={3}>
            {loading && <Loading />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box w={10} zIndex={10} top={9} left={5}>
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Image size="xs" source={Images.NavBarImage} />
                    </TouchableOpacity>
                </Box>
                <Stack flex={1} px={10} >
                    <Text mb={3} color="white" fontSize="4xl" textAlign="center" bold>Blog</Text>
                    <Stack py={5}>
                        <TouchableOpacity onPress={() => navigation.navigate("BlogPage1Screen")}>
                            <Stack my={2} bg="#EB5757" justifyContent='center' borderRadius={16} borderWidth={1} p={5} space={5} minH={200}>
                                <Text color="white" fontSize="3xl" bold textAlign="center">{"¿Como dejar\nprocastinar?"}</Text>
                            </Stack>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("BlogPage3Screen")}>
                            <Stack my={2} bg="#FFB61D" justifyContent="center" borderRadius={16} borderWidth={1} p={5} space={5} minH={200}>
                                <Text color="black" fontSize="3xl" bold textAlign="center">{"¿Como estudiar\ncualquier cosa?"}</Text>
                            </Stack>
                        </TouchableOpacity>
                    </Stack>
                </Stack>
            </ScrollView>
        </Box>
    )
}

export default DescubreScreen