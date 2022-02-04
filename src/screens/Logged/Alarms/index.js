import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Button, Image, HStack, Icon, Switch, AlertDialog } from 'native-base'
import { Loading } from '../../../components'
import { COLOR, db, Images } from '../../../constants'
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

const AlaramsScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [Alarms, setAlarms] = useState([])
    const [selectedItem, setSelectedItem] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((store) => store.auth)

    const onClose = () => setIsOpen(false);

    const LoadExchangeInfo = () => {
        setLoading(true)
        db.collection("Malarms").where("email", "==", user.email).get().then((querySnapshot) => {
            let tempAlarms = [];
            querySnapshot.forEach((doc) => {
                tempAlarms.push({ ...doc.data(), id: doc.id });
            });
            setAlarms(tempAlarms);
        });
        setLoading(false)
    }

    const ChangeState = (state, id) => {
        db.collection("Malarms").doc(id).update({
            enable: state
        })
    }

    const _handleDelete = (id) => {
        if (id) {
            setSelectedItem(id);
            setIsOpen(!isOpen)
        } else {
            db.collection("Malarms").doc(selectedItem).delete();
            onClose();
            LoadExchangeInfo();
        }
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.white} w='100%' pt={10}>
            {loading && <Loading />}
            <Box w={10} zIndex={10} top={5} left={5}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <Image zIndex={10} size="xs" source={Images.GobackImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box>
            <Stack flex={1} px={10} >
                <Text mb={3} color="black" fontSize="4xl" textAlign="center" bold>Alarmas</Text>
                <Stack py={5} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            Alarms.map((item, i) => {
                                return <Stack key={i} my={3}>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text color="black" fontSize="3xl" bold>{item.time}</Text>
                                        <Switch colorScheme="yellow" size="lg" defaultIsChecked={item.enable} onChange={({ nativeEvent }) => ChangeState(nativeEvent.value, item.id)} />
                                    </HStack>
                                    <HStack justifyContent="space-between">
                                        <Stack>
                                            <Text color="black" fontSize="sm" bold>{item.title}</Text>
                                        </Stack>
                                        <Stack>
                                            <Box position="absolute" right={10} bottom={0}>
                                                <TouchableOpacity onPress={() => navigation.navigate("AlarmsAddScreen", item)}>
                                                    <Icon size="xs" color={COLOR.base} as={<AntDesign name="edit" />} />
                                                </TouchableOpacity>
                                            </Box>
                                            <Box position="absolute" right={0} bottom={0}>
                                                <TouchableOpacity onPress={() => _handleDelete(item.id)}>
                                                    <Icon size="xs" color={COLOR.base} as={<AntDesign name="close" />} />
                                                </TouchableOpacity>
                                            </Box>
                                        </Stack>
                                    </HStack>
                                </Stack>
                            })
                        }
                    </ScrollView>
                </Stack>
            </Stack>
            <Stack alignItems="center" my={5}>
                <TouchableOpacity onPress={() => navigation.navigate("AlarmsAddScreen")}>
                    {/* <Icon size="sm" as={<AntDesign name="pluscircleo"/>}/> */}
                    <Image size="sm" resizeMode="contain" source={Images.AlarmAddImage} />
                </TouchableOpacity>
            </Stack>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                motionPreset={"fade"}
            >
                <AlertDialog.Content>
                    <AlertDialog.Header fontSize="lg" fontWeight="bold">
                        Quitar esta alarma?
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                        <Button onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onPress={() => _handleDelete()} ml={3}>
                            Eliminar
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </Box>
    )
}

export default AlaramsScreen