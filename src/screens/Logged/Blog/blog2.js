import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Box, Stack, Text, Button, Image, HStack, Avatar, Icon } from 'native-base'
import { Loading } from '../../../components'
import { Images } from '../../../constants'
import { Ionicons, AntDesign } from '@expo/vector-icons';


const PerfilScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const LoadExchangeInfo = () => {
        setLoading(true)
        setLoading(false)
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation])

    return (
        <Box flex={1} bg="#a1a1aa" w='100%'>
            {loading && <Loading />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack flex={1} pt={16}>
                    <Box mb={2} alignSelf="center">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={Images.ExitImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </Box>
                    <Stack borderWidth={2} bg="white" p={7} borderRadius={16}>
                        <HStack justifyContent="space-between">
                            <Avatar source={Images.SampleAvatar5} >
                                AK
                            </Avatar>
                            <Text bold fontSize="2xl">...</Text>
                        </HStack>
                        <Stack>
                            <Text fontSize="3xl" bold color="black" my={2}>
                                ¿Como usar la regla de 2 minutos para el trabajo?
                            </Text>
                            <HStack alignItems="center" justifyContent="space-between" px={5} py={2}>
                                <HStack alignItems="center" space={3}>
                                    {/* <Icon size="sm" as={<Ionicons name="heart-outline" />} /> */}
                                    <Text bold>Like</Text>
                                </HStack>
                                <Text>|</Text>
                                <HStack alignItems="center" mr={2} space={3}>
                                    <Icon size="sm" as={<AntDesign name="upload" />} />
                                    <Text bold>Share</Text>
                                </HStack>
                            </HStack>
                            <Text fontSize="md" p={3}>
                                Es una regla simple si se puede hacer en menos de 2 minutos se hace lo primero
                            </Text>
                            <Image resizeMode="contain" source={Images.Blog2Image} />

                            <Text fontSize="md" mt={5} p={3}>
                                Esta regla con algo de planificacion y una lista to-do hara que seas mas productivo y mas satisfecho al final del dia
                            </Text>
                            <HStack alignItems="center" justifyContent="space-between" mt={20}>
                                <Stack>
                                    <Text fontSize="md" color="black" bold>Alisa Red</Text>
                                    <Text fontSize="sm" color="black">33 March, 20</Text>
                                </Stack>
                                <Button bg={"#FFBD12"} borderRadius={16} borderWidth={2} _text={{ fontWeight: "bold" }} py={2}>Follow</Button>
                            </HStack>
                        </Stack>
                    </Stack>
                </Stack>
            </ScrollView>
        </Box>
    )
}

export default PerfilScreen