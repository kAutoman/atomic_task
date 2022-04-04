import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Button, Image, HStack, Icon,Input,Toast,TextArea } from 'native-base'
import { Loading } from '../../../components'
import { COLOR, db, Images } from '../../../constants'
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

const QuestionsScreeen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState(navigation.state.params)
    const { user } = useSelector((store) => store.auth)



    const LoadExchangeInfo = () => {
        if(item){
            setAnswer(item.answer)
            setQuestion(item.question)
        }
    }

    const _handleSave = async () => {
         if (question) {
            const timeStamp = Math.floor(Date.now() / 1000);
            const insertKey = "_" + timeStamp;
            setLoading(true);
            if (item) {
                await db.collection('Questions').doc(item.id).update({
                    question,
                    answer
                }).then(() => {
                    setLoading(false);
                    navigation.navigate("QuestionsScreen");
                    Toast.show({ title: 'Question updated successfully', placement: 'bottom', status: 'success' })
                }).catch(e => console.log(e))
            } else {
                await db.collection('Questions').doc(insertKey).set({
                    question,
                    answer
                }).then(() => {
                    setLoading(false);
                    navigation.navigate("QuestionsScreen");
                    Toast.show({ title: 'Question inserted', placement: 'bottom', status: 'success' })
                }).catch(e => console.log(e))
            }
        } else {
            return Toast.show({ title: 'Question can\'t empty!', placement: 'bottom', status: 'error' })
        }
        return;
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.white} w='100%' pt={0}>
            {loading && <Loading />}
            <Stack bg="#FFB61D" h={81}>
                <Box w={10} zIndex={10} top={8} left={5}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image zIndex={10} size="xs" source={Images.ExitImage} resizeMode="contain" />
                    </TouchableOpacity>
                    <Image zIndex={10} top={-40} left={200} size="xs" source={Images.BotImage} resizeMode="contain"/>
                </Box>
            </Stack>
            <Stack flex={1} px={3}>

                <Stack py={1} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Stack my={3} style={{borderRadius:10}}>
                            <Text color="black" fontSize="3xl" flex={1} p={3} bold>Question</Text>
                            <HStack alignItems="center">
                                <Input mx={3} placeholder="" onChangeText={(e) => setQuestion(e)} w="95%" value={question}/>
                            </HStack>
                        </Stack>
                        <Stack my={3}>
                            <Text color="black" fontSize="3xl" flex={1} p={3} bold>Answer</Text>
                            <TextArea mx={3} h={200} placeholder="Please input answer here" onChangeText={(e) => setAnswer(e)} w="95%" value={answer} />
                        </Stack>
                    </ScrollView>
                </Stack>
            </Stack>
            <Stack alignItems="center" bottom={0} h={66} bg="#18191F" width="100%" py={2}>
                <TouchableOpacity onPress={() => _handleSave()}>
                    <Text color="white" fontSize="3xl" flex={1}>Save</Text>
                </TouchableOpacity>
            </Stack>
           
        </Box>
    )
}

export default QuestionsScreeen