import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Text, Button, Image, HStack } from 'native-base'
import { Loading } from '../../../components'
import { COLOR, Images } from '../../../constants'
import { useDispatch } from 'react-redux'
import { History, Logut } from '../../../redux/actions/authActions'

const PerfilScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const LoadExchangeInfo = () => {
        setLoading(true)
        setLoading(false)
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation])

    const LogOut = () => {
        dispatch(Logut());
        dispatch(History(1));
    }

    return (
        <Box flex={1} bg={COLOR.black} w='100%'>
            {loading && <Loading />}
            <Stack flex={1} justifyContent="center" px={10}>
                <Stack borderWidth={2} bg="white" p={5} borderRadius={16}>
                    <Box mb={12} alignSelf="center">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={Images.ExitImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </Box>
                    <Text fontSize="3xl" bold color="black" textAlign="center">
                        {"¿Quieres cerrar\nla sesion?"}
                    </Text>
                    <HStack mt={7} justifyContent="space-between">
                        <Button _text={{color:"white",fontSize:30,fontWeight:"bold"}} py={1} variant="ghost" onPress={LogOut} w="45%" borderRadius={100} bg={"#DF2929"} alignSelf="center">SI</Button>
                        <Button _text={{color:"white",fontSize:30,fontWeight:"bold"}} py={1} variant="ghost"onPress={() => navigation.goBack()} w="45%" borderRadius={100} bg={"#333333"} alignSelf="center">No</Button>
                    </HStack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default PerfilScreen