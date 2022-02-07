import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Button, Image, Icon } from 'native-base'
import { COLOR, Images, Styles } from '../../../constants'
import { Entypo } from '@expo/vector-icons';

const PaymentSettingScreen = ({ navigation }) => {

    return (
        <Box flex={1} bg={"#333333"} w='100%' pt={12}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box w={10} zIndex={10} top={5} left={5}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen",1234)}>
                        <Image zIndex={10} size="xs" source={Images.ExitImage} resizeMode="contain" />
                    </TouchableOpacity>
                </Box>
                <Stack flex={1} px={10} >
                    <Text mb={3} color="#ED5151" fontSize="4xl" textAlign="center" bold>Sanciones  por incumplimiento</Text>
                    <Stack py={5}>
                        <Stack my={2} bg="#fff" borderRadius={16} borderWidth={1} p={5} space={2} minH={200}>
                            <Text color="#ED5151" fontSize="4xl" bold textAlign="center">Primera vez</Text>
                            <Text color="black" fontSize="3xl" bold textAlign="center">{"1. el 20% del deposito"}</Text>
                        </Stack>
                        <Stack my={2} bg="#F05D48" borderRadius={16} borderWidth={1} p={5} space={2} minH={200}>
                            <Text color="#fff" fontSize="4xl" bold textAlign="center">Segunda</Text>
                            <Text color="black" fontSize="3xl" bold textAlign="center">{"2. el 50% del deposito"}</Text>
                        </Stack>
                        <Stack my={2} bg="#E43434" borderRadius={16} borderWidth={1} p={5} space={2} minH={200}>
                            <Text color="#000" fontSize="4xl" bold textAlign="center">Game over</Text>
                            <Text color="white" fontSize="3xl" bold textAlign="center">{"3. el 100% del deposito"}</Text>
                        </Stack>
                        <Button pr={7} mt={7} _text={Styles.WelcomeButton} w={"100%"} borderRadius={16} onPress={() => navigation.navigate("HomeScreen",123)} bg={COLOR.white} alignSelf="center">IR AL INCIO <Icon style={{ position: "absolute", right: -30 }} color={COLOR.black} as={<Entypo name="chevron-right" />} /></Button>

                    </Stack>
                </Stack>
            </ScrollView>
        </Box>
    )
}

export default PaymentSettingScreen