import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Text, Button, Image, HStack } from 'native-base'
import { Loading } from '../../../components'
import { COLOR, Images, Styles } from '../../../constants'

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
        <Box flex={1} bg={COLOR.white} w='100%'>
            {loading && <Loading />}
            <Box pos="absolute" zIndex={10} top={12} left={5}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box>
            <Stack flex={1} px={10} pt={16}>
                <Text style={{ ...Styles.WelcomeText }}>Establece un objetivo</Text>
                <HStack my={5} alignItems="center" justifyContent="center">
                    <Stack space={5}>
                        <TouchableOpacity onPress={() => navigation.navigate("DescubreListScreen")}>
                            <Stack w="85%" bg="#FA6E5A" borderRadius={10} alignSelf="center" alignItems="center" p={4}>
                                <Image source={Images.Descubre1} resizeMode="contain" />
                                <Text mt={3} bold color="white">Productividad</Text>
                            </Stack>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("SaludListScreen")}>
                            <Stack w="85%" bg="#FDBCA0" borderRadius={10} alignSelf="center" alignItems="center" p={4}>
                                <Image source={Images.Descubre2} resizeMode="contain" />
                                <Text bold mt={5}>Salud</Text>
                            </Stack>
                        </TouchableOpacity>
                    </Stack>
                    <TouchableOpacity onPress={() => navigation.navigate("CrecimientoScreen")}>
                        <Stack w="85%" bg="#6CB28E" borderRadius={10} alignSelf="flex-start" alignItems="center">
                            <Image source={Images.Descubre3} resizeMode="contain" />
                            <Text my={3} bold color="white" textAlign="center">Crecimiento personal</Text>
                        </Stack>
                    </TouchableOpacity>
                </HStack>
                <Stack flex={1} justifyContent="center">
                    <Button _text={Styles.WelcomeButton} onPress={()=>navigation.navigate("CreateTaskScreen")} borderRadius={16} w="100%" bg={"#1947E5"} alignSelf="center">CREAR NUEVA META</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default DescubreScreen