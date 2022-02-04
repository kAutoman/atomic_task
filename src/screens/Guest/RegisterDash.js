import React from 'react'
import {Box, Image, Text, Stack, Button, Input, Icon, Spinner, HStack} from 'native-base'
import { COLOR, db, Images, Styles } from '../../constants'
import { TouchableOpacity } from 'react-native'
import * as GoogleSignIn from 'expo-google-sign-in';
import { setUserInfo } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux'
import {Entypo, Feather} from "@expo/vector-icons";

const SignInScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync()
        db.collection("users").where("email", "==", user.email).get().then(async (querySnapshot) => {
            let tempBox = [];
            querySnapshot.forEach((doc) => {
                tempBox.push(doc.data());
            });
            if (tempBox.length) {
                dispatch(setUserInfo(user));
            } else {
                await db.collection('users').doc(user.email).set({
                    email: user.email,
                    uid: user.uid,
                    password: null,
                    name: user.displayName
                });
                dispatch(setUserInfo(user));
            }
        });
    };


    const signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync()
            const { type } = await GoogleSignIn.signInAsync()
            if (type === 'success') {
                await _syncUserWithStateAsync()
            }
        } catch ({ message }) {
            alert('login: Error:' + message)
        }
    }

    return (
        <Stack
            flex={1}
            p={7}
            justifyContent="center"
            space={16}
            bg={COLOR.black}
        >
             <Box pos="absolute" left={7} top={12} zIndex={10}>
                 <TouchableOpacity onPress={() => navigation.goBack()}>
                     <Image source={Images.ExitImage} />
                 </TouchableOpacity>
             </Box>
            <Stack
                space={5}
                bg={COLOR.white}
                borderRadius={16} borderWidth={2}
                alignItems="center"
                p={5}
            >
                <Text style={Styles.WelcomeText}>Registro</Text>
                <Button _text={Styles.WelcomeButton} onPress={() => navigation.navigate("RegisterScreen")} borderRadius={16} w={"100%"} bg={COLOR.base} alignSelf="center">Email</Button>
                <Button _text={{ ...Styles.WelcomeButton, color: "white" }} onPress={signInAsync} borderRadius={16} w={"100%"} bg={"#EB5757"} alignSelf="center">Sign in with Googlea</Button>

            </Stack>
        </Stack>
    )
}

export default SignInScreen