import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Button, Image, HStack, Icon, Switch, AlertDialog } from 'native-base'
import { Loading } from '../../../components'
import { COLOR, db, Images } from '../../../constants'
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

const QuestionsScreeen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [Questions, setQuestions] = useState([])
    const [selectedItem, setSelectedItem] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((store) => store.auth)

    const LoadExchangeInfo = () => {
        setLoading(true)
        db.collection("Questions").get().then((querySnapshot) => {
            let tempQuestions = [];
            querySnapshot.forEach((doc) => {
                tempQuestions.push({ ...doc.data(), id: doc.id });
            });

            setQuestions(tempQuestions);
        });
        setLoading(false)
    }

    const onClose = () => setIsOpen(false);

    const _handleDelete = (id) => {
        if (id) {
            setSelectedItem(id);
            setIsOpen(!isOpen)
        } else {
            db.collection("Questions").doc(selectedItem).delete();
            onClose();
            LoadExchangeInfo();
        }
    }


    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation.state.params])

    return (
        <Box flex={1} bg={COLOR.white} w='100%' pt={0}>
            {loading && <Loading />}
            <Stack bg="#FFB61D" h={81}>
                <Box w={10} zIndex={10} top={8} left={5}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <Image zIndex={10} size="xs" source={Images.ExitImage} resizeMode="contain" />
                    </TouchableOpacity>
                    <Image zIndex={10} top={-40} left={200} size="xs" source={Images.BotImage} resizeMode="contain"/>
                </Box>
            </Stack>
            <Stack flex={1} px={3}>
                <Text mb={7} mt={10} color="black" fontSize="4xl" textAlign="center" bold>Panel of Bot</Text>
                <Stack py={1} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            Questions.map(question =>{
                                return <Stack my={3} bg="#FFB61D" key={question.id} style={{borderRadius:10}}>
                                    <HStack alignItems="center" p={3}>
                                        <Text color="black" fontSize="2xl" flex={1}>{question.question}</Text>
                                        <Box ml={3}>
                                            <TouchableOpacity onPress={() => _handleDelete(question.id)}>
                                                <Image source={Images.TrashOutline}/>
                                            </TouchableOpacity>
                                        </Box>

                                        <Box>
                                            <TouchableOpacity onPress={() => navigation.navigate("EditQuestionScreen",question)}>
                                                <Image source={Images.EditImage}/>
                                            </TouchableOpacity>
                                        </Box>

                                        <Box ml={3}>
                                            <TouchableOpacity onPress={() => {}}>
                                                <Image source={Images.SortImage}/>
                                            </TouchableOpacity>
                                        </Box>
                                    </HStack>
                                </Stack>
                            })
                        }
                    </ScrollView>
                </Stack>
            </Stack>
            <Stack alignItems="center" bottom={0} h={66} bg="#18191F" width="100%" py={2}>
                <TouchableOpacity onPress={() => navigation.navigate("EditQuestionScreen")}>
                    <Text color="white" fontSize="3xl" flex={1}>Add</Text>
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

export default QuestionsScreeen