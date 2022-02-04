import React, { useEffect, useState } from 'react'
import { Text, Stack, Button, Box, Image, Icon, HStack, View, useToast, Spinner } from 'native-base'
import { COLOR, db, Images, LAYOUT, ROOT } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import { useStripe, initStripe } from '@stripe/stripe-react-native';
import axios from 'axios'
import { useSelector } from 'react-redux'

const ChatScreen = ({ navigation }) => {
    const { initPaymentSheet, presentPaymentSheet, retrievePaymentIntent } = useStripe();
    const [cardInfo, setCardInfo] = useState(navigation.state.params);
    const [connectState, setConnectState] = useState(false);
    const [Loading, setLoading] = useState(false);
    const Toast = useToast();
    const { user } = useSelector((store) => store.auth)

    useEffect(() => {
        initStripe({
            publishableKey: LAYOUT.StripePublicKey
        });
    }, [])


    const HandePayment = async () => {
        setConnectState(true);
        setLoading(true);
        axios.post(`${ROOT.PAYMENT_URL}api/stripCardCreateSetupIntent/`, { cardInfo, email: user.email, name: user.displayName }).then(async ({ data }) => {
            if (data.status == true) {
                if (!data) {
                    console.log('clientSecret');
                    return
                }
                const initData = {
                    customerId: data.customer,
                    customerEphemeralKeySecret: data.customerEphemeralKeySecret,
                    paymentIntentClientSecret: data.paymentIntentClientSecret,
                    style: 'alwaysDark',
                }

                const result = await initPaymentSheet(initData)
                if (result.error) {
                    setConnectState(false);
                    console.log(result.error)
                } else {
                    setLoading(false);
                    if (data.paymentIntentClientSecret) {
                        const presentresult = presentPaymentSheet({ clientSecret: data.paymentIntentClientSecret });
                        Promise.resolve(presentresult).then(async (e) => {
                            if (e.error) {
                                setConnectState(false);
                                return Toast.show({ title: 'Acabas de cancelar', placement: 'bottom', status: 'warning', w: 400 })
                            } else {
                                const timeStamp = Math.floor(Date.now() / 1000);
                                const insertKey = "_" + timeStamp;
                                if (cardInfo.fullName === "Personalizada") {
                                    await db.collection('goals').doc(insertKey).set(cardInfo);
                                } else {
                                    await db.collection('payment_history').doc(insertKey).set({
                                        email: user.email,
                                        created_at: new Date(),
                                        amount: cardInfo.amount,
                                        cardType: cardInfo.type,
                                        cardId: cardInfo.id,
                                    });
                                }
                                setConnectState(false);
                                navigation.navigate("PaymentSettingScreen")
                                console.log('Success', 'The payment was confirmed successfully');
                            }
                        })
                    }
                }
            } else {
                setConnectState(false);
                return console.log(false)
            }
        })
    }

    return (
        <Box flex={1}>
            <Stack
                flex={1}
                bg={"#fff"}
                pt={12}
            >
                <HStack
                    h={65}
                    px={7}
                    alignItems="center"
                    justifyContent="center"
                >
                    <View pos="absolute" alignItems='flex-start' w={10} left={5} zIndex={10}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <Text fontSize='2xl' bold color={COLOR.black}>Checkout details</Text>
                    <View>
                    </View>
                </HStack>
                <Stack px={10} flex={1} justifyContent="center" paddingBottom={20} space={12}>
                    <Stack my={5}>
                        <Stack justifyContent="center" alignItems="center" space={5}>
                            <Text fontSize={30} bold>FOR PAYMENT</Text>
                            <Text color="black" fontSize={60} bold>&euro;{cardInfo.amount / 100}.00</Text>
                        </Stack>
                    </Stack>
                    <Text px={3} fontSize="sm" textAlign="center">
                        We will send you an order details to your email after the successfull payment
                    </Text>
                </Stack>

                <Button
                    mx={10}
                    mb={20}
                    onPress={HandePayment}
                    disabled={connectState}
                    colorScheme="green"
                    borderRadius={16}
                    startIcon={<Icon size="sm" viewBox="0 0 25 17">{LAYOUT.CreditCard}</Icon>}
                >
                    {
                        Loading ? <Spinner size="sm"></Spinner> : "Credit card"
                    }
                </Button>
            </Stack>
        </Box>
    )
}

export default ChatScreen;