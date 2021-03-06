import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Icon, Text, useToast, Spinner, Stack, Button, HStack, IconButton } from 'native-base'
import { History, setUserInfo } from '../../redux/actions/authActions'
import { useApi } from '../../redux/services'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { auth, COLOR, ROOT, db } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import firebase from 'firebase';

const ForgotPassScreen = ({ navigation }) => {

    const Api = useApi()
    const Toast = useToast()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)


    const sendCode = () => {
        if (email) {
            firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                return Toast.show({ title: "Password reset message has sent! Please check your email.", placement: 'bottom', status: 'success', w: 400 })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Toast.show({ title: errorMessage, placement: 'bottom', status: 'error', w: 400 })
            });
        } else {
            return Toast.show({ title: "Please Input your email correctly!", placement: 'bottom', status: 'error', w: 400 })
        }
    }

    useEffect(() => {
        dispatch(History(0));
    }, [])

    return (
        <Stack
            flex={1}
            p={7}
            bgColor={COLOR.base}

        >
            <Text fontSize="4xl" mt={10} color="white" textAlign="center" bold>¿Has olvidado la contraseña?</Text>
            <Stack justifyContent="center"
                space={16} flex={1}>
                <Stack space={6} >
                    <Input
                        color="white"
                        bg="#262626"
                        type="email"
                        onChangeText={setEmail}
                        _light={{ borderRadius: 15, borderColor: "#272626" }}
                        _focus={{ borderRadius: 15, borderColor: "#262626" }}
                        placeholder={"Email address"}
                        InputLeftElement={
                            <Icon
                                as={<Ionicons name="mail" />}
                                size="sm"
                                ml={4}
                                _light={{
                                    color: "gray.500",
                                }}
                                _dark={{
                                    color: "gray.500",
                                }}
                            />
                        }
                    />
                </Stack>

                <HStack justifyContent="space-between" mb={32}>
                    <Text textAlign="center" bold color="white" fontSize="4xl">Send code</Text>
                    <TouchableOpacity onPress={sendCode}>
                        <IconButton
                            bgColor="#FF4B26"
                            w={12}
                            h={12}
                            borderRadius={100}
                            variant="ghost"
                            icon={<Icon size="sm" color="white" as={<AntDesign name="arrowright" />} />}
                        />
                    </TouchableOpacity>
                </HStack>
            </Stack>
        </Stack >
    )
}

export default ForgotPassScreen