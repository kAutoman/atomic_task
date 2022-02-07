import { Box, Button, Image, ScrollView, Stack, Text, View} from 'native-base'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Loading } from '../../../components'
import { COLOR, db, Images, Styles } from '../../../constants'

const Challenge2Screen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    return (
        <Box flex={1} bg={COLOR.white} w='100%' pt={10}>
            {loading && <Loading />}
            {/* <Box w={10} zIndex={10} top={5} left={5}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <Image zIndex={10} size="xs" source={Images.GobackImage} resizeMode="contain" />
                </TouchableOpacity>
            </Box> */}
            <Stack flex={1} px={10} >
                <Text mb={3} color="black" fontSize="4xl" textAlign="center" bold>DIA 1</Text>                
                <Stack py={5} flex={1}>
                    <View style={Styles.ChallengeItemContainer}>
                        <View style={{ flex: 1}}>                    
                            <TouchableOpacity onPress={() => navigation.navigate("")} style={Styles.Challenge21Item}>
                                <Text fontSize="20" color={COLOR.white} bold>15 flexiones</Text>                                
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1}}>                    
                            <TouchableOpacity onPress={() => navigation.navigate("")} style={Styles.Challenge21Item}>
                                <Text fontSize="20" color={COLOR.white} bold>20 sentadillas</Text>                                
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1}}>                    
                            <TouchableOpacity onPress={() => navigation.navigate("")} style={Styles.Challenge21Item}>
                                <Text fontSize="20" color={COLOR.white} bold>20 burpees</Text>                                
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1}}>                    
                            <TouchableOpacity onPress={() => navigation.navigate("")} style={Styles.Challenge21Item}>
                                <Text fontSize="20" color={COLOR.white} bold>15 fondos en banco</Text>                                
                            </TouchableOpacity>
                        </View> 
                        <View style={{ flex: 1}}>                            
                        </View>                        
                        <Button _text={{ ...Styles.WelcomeButton, color: "black" }} colorScheme="warning" variant="ghost" w={"100%"} borderRadius={16} onPress={() => navigation.navigate("ChallengeScreen")} bg={"#F2C94C"} alignSelf=" center">Finalizar</Button>                        
                        <View style={{ flex: 1}}>                        
                        </View>                
                        <View style={{ flex: 1}}>                            
                        </View>                
                        <View style={{ flex: 1}}>                            
                        </View>                
                    </View>
                    
                </Stack>
            </Stack>
            
        </Box>
    )
}

export default Challenge2Screen