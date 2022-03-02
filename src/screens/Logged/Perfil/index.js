import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import {Box, Stack, Text, HStack, Icon, Link, Image} from 'native-base'
import { Loading } from '../../../components'
import {COLOR, Images, LAYOUT, Styles} from '../../../constants'
import { Entypo } from '@expo/vector-icons';
const PerfilScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const PerfilIcons = [LAYOUT.PerfilIcon1, LAYOUT.PerfilIcon2, LAYOUT.PerfilIcon3, LAYOUT.PerfilIcon4, LAYOUT.PerfilIcon5,];
    const Texts = ["Normas", "Cambiar contraseña",  "Valorar nuestro trabajo", "Historial de compras",  "Cerrar sesion"];
    const Links = ["NormasScreen", "ChangePassScreen", "Realimentación", "ShopHistoryScreen", "LogoutScreen"];

    const LoadExchangeInfo = () => {
        setLoading(true)
        setLoading(false)
    }
    const { user } = useSelector((store) => store.auth)

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation])

    console.log(user);

    return (
        <Box flex={1} pt={12} bg={"#231F20"} w='100%'>
            <Stack
                flex={1}
            >
                {loading && <Loading />}
                <Box pos="absolute" zIndex={10} top={5} left={5}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                    </TouchableOpacity>
                </Box>
                <Stack flex={1} justifyContent="center" px={10}>
                    <Stack alignItems="center" style={Styles.PaymentBlog} shadow={6} bg={"#FA6E5A"}>
                        <Text style={{fontSize: 24, textAlign: "center", fontWeight: "bold", color: COLOR.white}}>Tu fianza actual es</Text>
                        <Text style={{fontSize: 36, textAlign: "center", fontWeight: "bold", color: COLOR.white}} >&euro;{user.currentBond/100}</Text>
                    </Stack>
                    <Stack borderWidth={2} p={5} borderRadius={16} bg={"#FFFFFF"}>
                        {
                            Texts.map((item, i) => {
                                return item === "Valorar nuestro trabajo" ?
                                    <Link key={i} href="https://play.google.com/store/apps/details?id=com.atomic.task">
                                        <HStack my={3} alignItems="center" justifyContent="space-between" w="100%">
                                            <HStack alignItems="center" space={3}>
                                                <Icon size="sm" viewBox="0 0 24 24">{PerfilIcons[i]}</Icon>
                                                <Text color={COLOR.black} bold fontSize="md" numberOfLines={1} maxW={200}>{item}</Text>
                                            </HStack>
                                            <Icon as={<Entypo name="chevron-right" />} />
                                        </HStack>
                                    </Link> :
                                    <TouchableOpacity key={i} onPress={() => { navigation.navigate(Links[i]) }}>
                                        <HStack my={3} alignItems="center" justifyContent="space-between">
                                            <HStack alignItems="center" space={3}>
                                                <Icon size="sm" viewBox="0 0 24 24">{PerfilIcons[i]}</Icon>
                                                <Text color={COLOR.black} bold fontSize="md" numberOfLines={1} maxW={170}>{item}</Text>
                                            </HStack>
                                            <Icon as={<Entypo name="chevron-right" />} />
                                        </HStack>
                                    </TouchableOpacity>

                            }
                            )
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default PerfilScreen