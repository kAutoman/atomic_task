import { Alert, Box, Button, CloseIcon, Collapse, HStack, Icon, IconButton, Input, Spinner, Stack, Text, useToast, View } from 'native-base';
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-input'
import { auth, COLOR, db, LAYOUT } from '../../constants';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions/authActions';
import * as firebase from 'firebase';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
const thirdIndicatorStyles = {
    stepIndicatorSize: 15,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#007AFF',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#007AFF',
    stepStrokeUnFinishedColor: '#dedede',
    separatorFinishedColor: '#007AFF',
    separatorUnFinishedColor: '#dedede',
    stepIndicatorFinishedColor: '#007AFF',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999999',
    labelSize: 10,
    currentStepLabelColor: '#7eaec4',
};

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBFKOiohODALvCzKrBq4ue4fOkWJ2DH_5Q",
    authDomain: "atomic-task-4e592.firebaseapp.com",
    projectId: "atomic-task-4e592",
    storageBucket: "atomic-task-4e592.appspot.com",
    messagingSenderId: "106199221549",
    appId: "1:106199221549:android:141149dba9400eda4abfa4",
};

try {
    if (FIREBASE_CONFIG.apiKey) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
} catch (err) {
    // ignore app already initialized error on snack
}

export default function Register({ navigation }) {
    const recaptchaVerifier = React.useRef(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const dispatch = useDispatch();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const Toast = useToast();
    const attemptInvisibleVerification = false;
    const phone = React.useRef(null);
    const firebaseConfig = firebase.app().options;
    const [show, setShow] = React.useState(true);
    const [phoneNumber, setPhoneNumber] = React.useState('+1');
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [showpassword, setShowpassword] = React.useState(true)
    const onPhoneInputChange = (value, iso2) => {
        const newState = {
            phoneInputValue: value,
        };
        setPhoneNumber(value);
    }

    const signInWithPhoneNumber = async () => {

        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            try {
                const verificationId = await phoneProvider.verifyPhoneNumber(
                    phoneNumber,
                    // @ts-ignore
                    recaptchaVerifier.current
                );
                setVerificationId(verificationId);
                setCurrentPage(2);
            } catch (err) {
                return Toast.show({ title: err.message, placement: 'bottom', status: 'error', w: 400 })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const HandleSignUp = async () => {
        if (email == '') {
            return Toast.show({ title: 'Email is required!', placement: 'bottom', status: 'error', w: 400 })
        }
        if (password == '') {
            return Toast.show({ title: 'Password is required!', placement: 'bottom', status: 'error', w: 400 })
        }

        setLoading(true);
        try {
            let user = await auth.createUserWithEmailAndPassword(email, password);
            await db.collection('users').doc(email.toLowerCase()).set({
                email: email.toLowerCase(),
                uid: user.user.uid,
                password,
                name
            });
            auth.currentUser.updateProfile({ displayName: name, phoneNumber });
            dispatch(setUserInfo(user.user));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            return Toast.show({ title: error.message, placement: 'bottom', status: 'error', w: 400 })
        }
    }

    return (
        <View style={styles.container} pt={12}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                    attemptInvisibleVerification={attemptInvisibleVerification}
                    cancelLabel='Close'
                />
                <HStack px={7} justifyContent="space-between" alignItems="center">
                    <HStack alignItems="center" space={2}>
                        <Icon size="sm">{LAYOUT.Cicon}</Icon>
                        <Text color="black" fontSize="lg">ATOMIC TASK</Text>
                    </HStack>
                    <Box>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon as={<Ionicons name="close" />} size="xl" color="#E2E4E5" />
                        </TouchableOpacity>
                    </Box>
                </HStack>
                <View style={styles.stepIndicator}>
                    <StepIndicator
                        stepCount={3}
                        customStyles={thirdIndicatorStyles}
                        currentPosition={currentPage}
                    />
                </View>
                <View style={styles.swiper} p={7} pt={5} >
                    <Text style={styles.text} textAlign="center" my={2}>Registro</Text>

                    <Stack d={currentPage === 1 ? "flex" : "none"}>
                        <Text my={3} fontSize="sm">Escribe tu numero</Text>
                        <PhoneInput
                            ref={phone}
                            initialCountry={'us'}
                            initialValue=""
                            onChangePhoneNumber={onPhoneInputChange}
                            textProps={{
                                placeholder: 'Enter a phone number...'
                            }}
                        />
                        <Button size="sm" w={40} alignSelf="center" onPress={signInWithPhoneNumber} my={5} variant="outline">
                            Send Code
                        </Button>
                    </Stack>

                    <Stack d={currentPage === 2 ? "flex" : "none"} py={5} space={5}>
                        <Stack p={3} bg="#EFF7FF" space={1}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text color={COLOR.black}>{phoneNumber}</Text>
                                <Icon size="sm" color="#007AFF" as={<MaterialIcons name="edit" />} />
                            </HStack>
                            <Text fontSize="xs">Numero sin verficar</Text>
                        </Stack>

                        <Text fontSize="xs" my={3}>Confirmation code</Text>
                        <Input
                            onChangeText={setVerificationCode}
                            variant="underlined"
                            py={2}
                            placeholder="Code number..."
                            _light={{
                                placeholderTextColor: "blueGray.400",
                            }}
                            _dark={{
                                placeholderTextColor: "blueGray.50",
                            }}
                        />


                        <Box>
                            <TouchableOpacity onPress={() => { setCurrentPage(1) }}>
                                <HStack space={3}>
                                    <Icon color="#007AFF" size="sm" as={<MaterialCommunityIcons name="reload" />} />
                                    <Text color="#007AFF">Send again</Text>
                                </HStack>
                            </TouchableOpacity>
                        </Box>
                        <Button
                            size="sm" w={40}
                            alignSelf="center"
                            onPress={async () => {
                                try {
                                    const credential = firebase.auth.PhoneAuthProvider.credential(
                                        verificationId,
                                        verificationCode
                                    );
                                    setVerificationId('');
                                    setVerificationCode('');
                                    console.log(credential);
                                    setCurrentPage(3)
                                } catch (err) {
                                    console.log(err);
                                }
                            }} my={5} variant="outline">
                            Confirm
                        </Button>
                    </Stack>

                    <Stack d={currentPage === 3 ? "flex" : "none"} py={5}>
                        <Text textAlign="center" mb={5}>Complete los datos de registro. Tardará un par de minutos. Todo lo que necesita es un número de teléfono y un correo electrónico.</Text>
                        <Stack p={3} bg="#EFF7FF" space={1}>
                            <Text color={COLOR.black}>{phoneNumber}</Text>
                            <HStack alignItems="center" >
                                <Icon size="sm" color={COLOR.base} as={<Ionicons name="checkmark-sharp" />} />
                                <Text fontSize="xs">Number not confirmed yet</Text>
                            </HStack>
                        </Stack>

                        <Text fontSize="xs" mt={5}>Escribe tu email</Text>
                        <Input
                            error={true}
                            onChangeText={setEmail}
                            variant="underlined"
                            placeholder="Introduce tu correo electrónico"
                            py={2}
                            _light={{
                                placeholderTextColor: "blueGray.400",
                            }}
                            _dark={{
                                placeholderTextColor: "blueGray.50",
                            }}
                        />
                        <Text fontSize="xs" mt={5}>Escribe tu nombre</Text>
                        <Input
                            error={true}
                            onChangeText={setName}
                            variant="underlined"
                            placeholder="Ingrese su nombre"
                            py={2}
                            _light={{
                                placeholderTextColor: "blueGray.400",
                            }}
                            _dark={{
                                placeholderTextColor: "blueGray.50",
                            }}
                        />
                        <Text fontSize="xs" mt={5}>Set a password</Text>
                        <Input
                            onChangeText={setPassword}
                            variant="underlined"
                            placeholder="Ingrese su contraseña"
                            secureTextEntry={showpassword}
                            py={2}
                            _light={{
                                placeholderTextColor: "blueGray.400",
                            }}
                            _dark={{
                                placeholderTextColor: "blueGray.50",
                            }}
                            InputRightElement={<TouchableOpacity onPress={() => { setShowpassword(!showpassword) }}><Icon size="sm" mr={2} viewBox="0 0 22 16">{LAYOUT.ShowpasswordIcon}</Icon></TouchableOpacity>}
                        />

                        <Button colorScheme="blue" w={40} alignSelf="center" onPress={HandleSignUp} disabled={loading} my={5}>
                            {
                                loading ?
                                    <Spinner size="sm" /> :
                                    "Register now"
                            }
                        </Button>
                    </Stack>
                </View>
                {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    stepIndicator: {
        marginTop: 40,
        marginHorizontal: 30,
        width: "70%",
        alignSelf: "center"
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#999999',
    },
    stepLabelSelected: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#4aae4f',
    },
    swiper: {
        flex: 1,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "black"

    }
});