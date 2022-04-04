import React, { useState } from 'react'
import { Input, Icon, Text, Spinner, Stack, Button, ScrollView, Box, Image } from 'native-base'
import { auth, COLOR, Images } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

const ChangePassScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [username, setUserName] = useState()
    const [phone, setphone] = useState()

    const Save = () => {
        auth.currentUser.updateProfile({
            displayName: username,
            phoneNumber: phone,
        }).then(function () {
            auth.user
        }, function (error) {
            console.log(error)
        });
    }

    return (
        <Stack
            flex={1}
            p={7}
            justifyContent="center"
        >
            <Box flex={1}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Stack alignItems="center" mt={10} space={2}>
                        <Image source={Images.SampleAvatar1} size="xl" borderRadius={100} />
                        <Box p={2} position="absolute" bottom={-7} bg="white" borderRadius={100} shadow={7}>
                            <TouchableOpacity>
                                <Icon size={5} color={COLOR.base} as={<Feather name="camera" />} />
                            </TouchableOpacity>
                        </Box>
                    </Stack>
                    <Stack py={7} flex={1}>
                        <Input h={45} my={1} value={username} onChangeText={setUserName} size="sm" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Name"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                        <Input h={45} my={1} size="sm" onChangeText={setphone} value={phone} borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Phone number"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                    </Stack>
                    <Button
                        mt={20}
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
                </ScrollView>
            </Box>
        </Stack >
    )
}

export default ChangePassScreen