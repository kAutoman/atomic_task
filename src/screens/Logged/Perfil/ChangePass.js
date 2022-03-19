import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Text, useToast, Spinner, Stack, Button, Box, Image, HStack, View } from 'native-base'
import { setUserInfo } from '../../../redux/actions/authActions'
import { auth, COLOR, db, Images } from '../../../constants'
import { TouchableOpacity } from 'react-native'

const ChangePassScreen = ({ navigation }) => {

    const { user } = useSelector((store) => store.auth);
    const Toast = useToast()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [currentPass, setCurrentPass] = useState()
    const [newPass, setNewPass] = useState()
    const [passConfirm, setPassConfirm] = useState();

    const Save = async () => {
        if (currentPass && newPass && passConfirm) {
            setLoading(true);
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.id.toLowerCase() === user.email) {
                        let userInfo = doc.data();
                        if (user.password === currentPass) {
                            if (newPass === passConfirm) {
                                auth.currentUser.updatePassword(newPass);
                                db.collection("users").doc(user.email).update({
                                    password: newPass
                                })
                                userInfo.password = newPass;
                                dispatch(setUserInfo(userInfo));
                                setLoading(false);
                                navigation.goBack();
                                return Toast.show({ title: 'Password updated correctly!', placement: 'bottom', w: 400, status: 'success' })
                            } else {
                                setLoading(false);
                                return Toast.show({ title: 'Confirm Password is incorrect!', placement: 'bottom', w: 400, status: 'error' })
                            }
                        } else {
                            setLoading(false);
                            return Toast.show({ title: 'Current Password is incorrect!', placement: 'bottom', w: 400, status: 'error' })
                        };
                    }
                });
            })
        } else {
            return Toast.show({ title: 'Please input correctly!', placement: 'bottom', w: 400, status: 'error' })
        }
    }

    useEffect(() => {
    }, [])

    return (
        <Stack
            flex={1}
            py={5}
            pt={12}
        >
            <Box flex={1}>
                <HStack
                    h={65}
                    alignItems="center"
                    justifyContent="center"
                >
                    <View pos="absolute" alignItems='flex-start' w={10} left={5} zIndex={10}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <Text fontSize='2xl' bold color={COLOR.black} numberOfLines={1}>Cambiar la contraseña</Text>
                    <View>
                    </View>
                </HStack>
                <Stack p={7} flex={1} >
                    <Input type="password" h={45} my={1} value={currentPass} onChangeText={setCurrentPass} size="sm" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Contraseña actual"
                        _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                    />
                    <Input type="password" h={45} my={1} size="sm" onChangeText={setNewPass} value={newPass} borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Nueva contraseña"
                        _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                    />
                    <Input type="password" h={45} my={1} size="sm" onChangeText={setPassConfirm} value={passConfirm} borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Contraseña confirmada"
                        _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                    />
                </Stack>
                <Button
                    mx={7}
                    my={10}
                    h={45}
                    bg={COLOR.base}
                    variant="ghost"
                    onPress={Save}
                    colorScheme="orange"
                    borderRadius={15}
                    disabled={loading}
                >
                    {loading ?
                        <Spinner size='sm' /> :
                        <Text color={COLOR.white} fontSize="md" pt={1}>Save</Text>
                    }
                </Button>
            </Box>
        </Stack >
    )
}

export default ChangePassScreen