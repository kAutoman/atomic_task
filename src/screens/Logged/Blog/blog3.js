import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Box, Stack, Text, Image, HStack, Avatar } from 'native-base'
import { Loading } from '../../../components'
import { Images } from '../../../constants'

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
                <Stack flex={1} pt={12}>
                    <Box mb={2} alignSelf="center">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={Images.ExitImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </Box>
                    <Stack borderWidth={2} bg="white" p={7} borderRadius={16}>
                        <HStack justifyContent="space-between">
                            <Avatar source={Images.SampleAvatar2} >
                                AK
                            </Avatar>
                            <Text bold fontSize="2xl">...</Text>
                        </HStack>
                        <Stack>
                            <Text fontSize="3xl" bold color="black" textAlign="center" my={2}>
                                1. Prepara elmaterial de estudio
                            </Text>
                            <Text fontSize="md" p={3}>
                                Sea un examen de quimica sea la tabla de mutiplicar sino sabes que estudiar no podras aprenderlo
                            </Text>
                            <Image resizeMode="contain" source={Images.Blog3Image} />
                        </Stack>
                        <Stack>
                            <Text fontSize="3xl" bold color="black" my={2} textAlign="center">
                                2. Sigue el metodo
                                que mejor se adapte
                            </Text>
                            <Text fontSize="md" p={3}>
                                {"Hay muchas formas de aprender pero las  mejores son probarte a ti mismo, explicarlo a otra persona y lo entienda\nPara esto utilizaremos quizlets o cualquier persona para explicarle eso"}
                            </Text>
                        </Stack>
                        <Stack>
                            <Text fontSize="3xl" bold color="black" my={2} textAlign="center">
                                3. Vuelvete
                                cuentacuentos
                            </Text>
                            <Text fontSize="md" p={3}>
                                {"Si quieres recordar algo con mas facilidad haz un cuento de eso cuando mas absurdo sea mejor"}
                            </Text>
                        </Stack>
                        <Stack>
                            <Text fontSize="3xl" bold color="black" my={2} textAlign="center">
                                4. Pomodoro
                            </Text>
                            <Text fontSize="md" p={3}>
                                {"Trabajar con descansos programados ayuda a enfocarse mas tiempo."}
                            </Text>
                            <Text fontSize="md" p={3} pt={0}>
                                {"Lo habitual es 45 minutos trabajo + 15 minutos descanso intenta no pasar de las 2 horas sin un descanso largo"}
                            </Text>
                        </Stack>
                        <Stack>
                            <Text fontSize="3xl" bold color="black" my={2} textAlign="center">
                                5. Tiempos de
                                descanso
                            </Text>
                            <Text fontSize="md" p={3}>
                                {"Un factor importante es el tiempo , depende del tiempo que tengas para aprender"}
                            </Text>
                        </Stack>
                        <Stack>
                            <Text fontSize="md" px={3} py={2} bold>
                                {"Descansos entre pomodoros completos"}
                            </Text>
                            <Text fontSize="md" px={3} py={2} color="#EC3A50">
                                {"Poco tiempo:"}
                            </Text>
                            <Text fontSize="md" px={3} py={2}>
                                {"15 minutos - 6 o 8 horas - 24 horas"}
                            </Text>
                            <Text fontSize="md" px={3} py={2} mt={5} color="#EC3A50">
                                {"Mucho tiempo: "}
                            </Text>
                            <Text fontSize="md" px={3} py={2}>
                                {"20 minutos - 24 horas -1 semana -"}
                            </Text>
                            <Text fontSize="md" px={3} py={2}>
                                {"3 semanas "}
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </ScrollView>
        </Box>
    )
}

export default PerfilScreen