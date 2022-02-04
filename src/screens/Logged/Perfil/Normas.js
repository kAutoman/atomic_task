import React from 'react'
import { Text, Stack,  Box, Image } from 'native-base'
import {  Images, } from '../../../constants'
import { ScrollView, TouchableOpacity } from 'react-native'

const Normas = ({ navigation }) => {
    return (
        <Stack
            flex={1}
            bg={"#F05F5F"}
            pt={12}
        >

            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack pb={3}>
                    <Box mb={12} style={{ position: "relative" }} alignSelf="flex-end" zIndex={10} top={5} right={7}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={Images.ExitImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </Box>
                    <Text my={-5} bold color="#263238" fontSize="6xl" textAlign="center">{"Las reglas"}</Text>
                    <Text my={-3} bold color="#263238" fontSize="6xl" textAlign="center">{"son"}</Text>
                    <Text mt={-5} bold color="#263238" fontSize="6xl" textAlign="center">{"simples"}</Text>
                </Stack>
                <Stack bg="#333333" p={10}>
                    <Stack my={7}>
                        <Text fontSize="4xl" color="#F05F5F" bold>
                            1. Regla
                        </Text>
                        <Text fontSize={32} color="white" bold >
                            {"Se preguntara periodicamente si\nla tarea se ha ejecutado o solo una vez si no es periodica"}
                        </Text>
                    </Stack>
                    <Stack my={7}>
                        <Text fontSize="4xl" color="#F05F5F" bold>
                            2. Regla
                        </Text>
                        <Text fontSize={32} color="white" bold>
                            {"Se debe enviar una\ncofirmacion de la tarea finalizado se contara como  no concluida"}
                        </Text>
                    </Stack>
                    <Stack my={7}>
                        <Text fontSize="4xl" color="#F05F5F" bold>
                            3. Regla
                        </Text>
                        <Text fontSize={32} color="white" bold>
                            Habra 3 tipos sanciones  por incumplimiento si se repite 3 veces consecutivamente se perdera el 100% del deposito
                        </Text>
                    </Stack>
                </Stack>
                <Box px={12} py={12}>
                </Box>
            </ScrollView>
        </Stack>
    )
}

export default Normas;