import { Box, Button, Image, ScrollView, Stack, Text, View} from 'native-base'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, TouchableHighlight } from 'react-native'
import { useSelector } from 'react-redux'
import { Loading } from '../../../components'
import { COLOR, db, Images, Styles } from '../../../constants'

const ChallengeScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [Alarms, setAlarms] = useState([])
    const [selectedItem, setSelectedItem] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((store) => store.auth)
    const [ isPress, setIsPress ] = useState(false);


    const onClose = () => setIsOpen(false);
    const AcceptHandle = async () => {
        
    }

    const SelectedDay = () => {             
        setIsPress(true);
    }

    const LoadExchangeInfo = () => {
        
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
                <Text mb={3} color="black" fontSize="4xl" textAlign="center" bold>21 DIAS DE</Text>
                <Text mb={3} color="black" fontSize="4xl" textAlign="center" bold>EJERCICIOS</Text>
                <Stack py={5} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>                        
                        <Text fontSize="md" p={3} justifyContent="center">
                        Durante 21 dias nos enfocaremos en 
                        ejercicios  que trabajen todo el 
                        cuerpo sin usar equipamiento , no te  
                        van a consumir mucho 
                        tiempo  a lo largo del entrenamineto 
                        ira aumentando progresivamente la 
                        dificultad.                        
                        </Text>                        
                        <Text fontSize="md" p={3} justifyContent="center">
                        Cada tarea tiene el limite de un dia 
                        </Text>                        
                        <Button  _text={Styles.AcceptChallegeButton} borderRadius={16} onPress={()=>navigation.navigate("Challenge1Screen")} w={"100%"} bg={COLOR.base} alignSelf="center">Aceptar desafìo </Button>
                        <Text fontSize="lg" color="black" bold paddingTop={10} alignSelf="center">Semana 1</Text>
                        <View style={Styles.ChallengeBtnContainer}>
                            <View style={{ flex: 1}}><TouchableHighlight onPress={SelectedDay} style={Styles.ChallengeNoButton}><Text bold>1</Text></TouchableHighlight></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>2</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>3</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>4</Text></TouchableOpacity></View>
                        </View>
                        <View style={Styles.ChallengeBtnContainer}>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>5</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>6</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>7</Text></TouchableOpacity></View>                            
                            <View style={{ flex: 1}}></View>                            
                        </View>
                        <Text fontSize="lg" color="black" bold paddingTop={10} alignSelf="center">Semana 2</Text>
                        <View style={Styles.ChallengeBtnContainer}>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>8</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>9</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>10</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>11</Text></TouchableOpacity></View>
                        </View>
                        <View style={Styles.ChallengeBtnContainer}>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>12</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>13</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>14</Text></TouchableOpacity></View>                            
                            <View style={{ flex: 1}}></View>                            
                        </View>
                        <Text fontSize="lg" color="black" bold paddingTop={10} alignSelf="center">Semana 3</Text>
                        <View style={Styles.ChallengeBtnContainer}>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>15</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>16</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>17</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>18</Text></TouchableOpacity></View>
                        </View>
                        <View style={Styles.ChallengeBtnContainer}>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>19</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>20</Text></TouchableOpacity></View>
                            <View style={{ flex: 1}}><TouchableOpacity style={Styles.ChallengeNoButton}><Text bold>21</Text></TouchableOpacity></View>                            
                            <View style={{ flex: 1}}></View>                            
                        </View>
                    </ScrollView>
                    
                </Stack>
            </Stack>
            
        </Box>
    )
}

export default ChallengeScreen