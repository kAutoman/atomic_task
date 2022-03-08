import React, { useEffect, useRef, useState } from 'react'
import { Text, Stack, Box, Image, Icon, Input, HStack, View } from 'native-base'
import { COLOR, database, db, Images, LAYOUT } from '../../../constants'
import { AppState, ScrollView, TouchableOpacity } from 'react-native'
import { PrivateMessage,ChatBotMessage,Loading } from '../../../components'
import { useSelector } from 'react-redux'

const ChatBotScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState([]);
    const { user } = useSelector((store) => store.auth);
    const [question, setQuestion] = useState([]);
    const [isInitial,setInitStatus] = useState(true);
    const scrollbox = useRef(null);

    const getQuestions = () => {
        setLoading(true);
        db.collection('Questions').get().then(querySnapshot => {
            let questions = [];
            querySnapshot.forEach((doc) => {
                questions.push(doc.data());
            });
            setQuestionList(questions);
            setLoading(false);
        });
    };

    const _questionClickHandler = (question) => {
        setInitStatus(false);
        setQuestion(question);
    }

    useEffect(() => {
        getQuestions();
    }, [])
    return (
        <Box flex={1} bg={"#fff"} pt={12}>
            {loading && <Loading />}
            <Stack
                flex={1}
            >
            {isInitial && <HStack
                    h={65}
                    px={7}
                    alignItems="center"
                    // borderBottomWidth={2}
                    justifyContent="center"
                >
                    <View pos="absolute" alignItems='flex-start' w={10} left={5} zIndex={10}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image size="xs" source={Images.ExitImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <Text fontSize='3xl' bold color={COLOR.black} numberOfLines={1}>Chat</Text>
                </HStack>}
                
                <Stack py={3} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false} ref={scrollbox} onContentSizeChange={() => { scrollbox.current.scrollToEnd() }} >
                    {
                        isInitial && <>
                        <ChatBotMessage message={"Hola soy ATOM tu asistente,elige una de estas temas"} />
                        <Stack px={50} mt={45}>
                            {
                                questionList.map(function(question) {
                                    return <Box borderRadius={20} mt={3} key={question.question} width="100%" bg="#FA6E5A" >
                                                <TouchableOpacity onPress={()=>_questionClickHandler(question)}>
                                                    <Text fontSize='2xl' py={4}  bold alignSelf="center" color="white" numberOfLines={1}>{question.question}</Text>
                                                </TouchableOpacity>
                                            </Box>    
                                })
                            }
                        </Stack>
                        </>
                  }
                  {!isInitial && <>
                      <ChatBotMessage message={question.answer} mt={3}/>
                      <ChatBotMessage message={"¿Te he podido ayudar?"} mt={3}/>
                       <Stack px={25} mt={45}>
                        <Box borderRadius={20} width="100%" bg="#FA6E5A" >
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text fontSize='2xl' py={4}  bold alignSelf="center" color="white" numberOfLines={1}>Esta respuesta me ha ayudado</Text>
                            </TouchableOpacity>
                        </Box>

                        <Box borderRadius={20} mt={3} width="100%" bg="#FA6E5A" >
                            <TouchableOpacity onPress={() => setInitStatus(true)}>
                                <Text fontSize='2xl' py={4} px={4} bold alignSelf="center" color="white" numberOfLines={2}>Quiero saber más sobre diferentes temas</Text>
                            </TouchableOpacity>
                        </Box>

                        <Box borderRadius={20} mt={3} width="100%" bg="#FA6E5A" >
                            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
                                <Text fontSize='2xl' py={4} px={4}  bold alignSelf="center" color="white" numberOfLines={2}>No me ha sido util, quiero hablar con un especialista</Text>
                            </TouchableOpacity>
                        </Box>
                      </Stack>
                      </>
                  }
                    </ScrollView>
                </Stack>
            </Stack>
            
        </Box>
    )
}

export default ChatBotScreen;