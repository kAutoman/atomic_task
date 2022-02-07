import React, { useState } from 'react'
import { Text, Stack, Box, Image } from 'native-base'
import { COLOR, Images, Styles } from '../../../constants'
import { TouchableOpacity } from 'react-native'

const DepositoScreen = ({ navigation }) => {
    const [cardInfo, setCardInfo] = useState(navigation.state.params);
    
    const NextPage = (amount) => {
        navigation.navigate("PaymentScreen", { ...cardInfo, amount })
    }
    
    return (
        <Stack
            flex={1}
            bg={"#000"}
            p={7}
            justifyContent="center"
            pt={12}
        >
            <Box pos="absolute" zIndex={10} top={12} left={7}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.ExitImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box>
            <Text fontSize="3xl" pos="absolute" color="white" bold alignSelf="center" top={16}>DEPOSITOS</Text>
            <TouchableOpacity onPress={() => NextPage(2500)}>
                <Stack alignItems="center" style={Styles.PaymentBlog} shadow={6} bg={COLOR.yellow}>
                    <Text style={Styles.WelcomeText}>&euro;25</Text>
                    <Text color={COLOR.black}>Basic</Text>
                </Stack>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => NextPage(5000)}>
                <Stack alignItems="center" style={Styles.PaymentBlog} shadow={6} bg={COLOR.white}>
                    <Text style={Styles.WelcomeText}>&euro;50</Text>
                    <Text color={COLOR.black}>Standard</Text>
                </Stack>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => NextPage(10000)}>
                <Stack alignItems="center" style={Styles.PaymentBlog} shadow={6} bg={COLOR.yellow}>
                    <Text style={Styles.WelcomeText}>&euro;100</Text>
                    <Text color={COLOR.black}>Work-Team</Text>
                </Stack>
            </TouchableOpacity>
        </Stack>
    )
}

export default DepositoScreen;