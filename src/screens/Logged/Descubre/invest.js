import React, { useEffect } from 'react'
import {Text, Stack, Button, Box, Image, View, Input} from 'native-base'
import {COLOR, Images, Styles} from '../../../constants'
import { TouchableOpacity } from 'react-native'

const App = ({ navigation }) => {

    useEffect(() => {

    }, [])

    return (
        <Box flex={1}>
            <Stack
                flex={1}
                bg={"#fff"}
                pt={12}
            >
                <Stack
                    h={65}
                    px={10}
                    alignItems="center"
                    justifyContent="center"
                >
                    <View pos="absolute" alignItems='flex-start' w={10} left={5} zIndex={10}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image size="xs" source={Images.GobackImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                </Stack>
                <Stack px={10} flex={1}  mt={150} justifyContent="center" paddingBottom={20} space={12}>
                    <Stack my={5}>
                        <Stack alignItems="center" style={Styles.PaymentBlog} shadow={6} bg={COLOR.black}>
                            <Text style={{fontSize: 24, textAlign: "center", fontWeight: "bold", color: COLOR.white}}>Tu fianza actual es</Text>
                            <Text style={{fontSize: 36, textAlign: "center", fontWeight: "bold", color: COLOR.white}} >400&euro;</Text>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack
                    px={10} flex={1} justifyContent="center" paddingBottom={20} space={12}
                >
                    <Input
                        borderWidth={2}
                        borderRadius={16}
                        borderColor="black"
                        placeholder="porcentajes" // mx={4}
                        _focus={{
                            borderColor: "black"
                        }}
                        _light={{
                            placeholderTextColor: "blueGray.700",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.550",
                        }}
                    />
                </Stack>

                <Button
                    mx={10}
                    mb={100}
                    onPress={()=>navigation.navigate("Signature2Screen")}
                    borderRadius={16}
                    _text={Styles.WelcomeButton}
                    w={"85%"} bg={COLOR.base} alignSelf="center">Guaradar
                </Button>

            </Stack>
        </Box>
    )
}

export default App;