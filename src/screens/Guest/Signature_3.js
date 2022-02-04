import React from 'react'
import { Text, Stack, Button, Icon, Checkbox } from 'native-base'
import { COLOR, Styles } from '../../constants'
import { Entypo } from '@expo/vector-icons';

const Signature_3 = ({ navigation }) => {
    return (
        <Stack
            flex={1}
            justifyContent="center"
            bg={COLOR.white}
            p={7}
            pt={12}
        >
            <Stack alignItems="flex-start" space={8}>
                <Checkbox _text={{...Styles.WelcomeText,marginTop:-2}} aria-label="1" size="lg" value="orange" bg={"yellow"} colorScheme="orange" defaultIsChecked>
                    Ir al gimnasio
                </Checkbox>
                <Checkbox _text={{...Styles.WelcomeText,marginTop:-1}} aria-label="1" size="lg" value="orange" colorScheme="orange" defaultIsChecked>
                    {`Leer los libros \n de la estanteria`}
                </Checkbox>
                <Checkbox _text={{...Styles.WelcomeText,color:"#E49621!important",marginTop:-1}} aria-label="1" size="lg" value="orange" colorScheme="orange" defaultIsChecked>
                    Añadir
                </Checkbox>
            </Stack>
            <Text style={Styles.WelcomeText} mt={32}>Elige una tarea que hacer</Text>
            <Button pr={7} mt={7} _text={Styles.WelcomeButton} borderRadius={16} onPress={()=>navigation.navigate("Signature4Screen")} w={"70%"} bg={COLOR.base} alignSelf="center">Siguiente <Icon style={{ position: "absolute", right: -30 }} color={COLOR.white} as={<Entypo name="chevron-right" />} /></Button>
        </Stack>
    )
}

export default Signature_3;