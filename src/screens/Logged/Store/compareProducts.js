import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity,Dimensions} from 'react-native'
import { Box, Stack, ScrollView, Text, Input, Icon, Image,Button } from 'native-base'
import { StoreHeaders, Loading } from '../../../components'
import { COLOR, db, Images, LAYOUT, Styles } from '../../../constants'
import { useSelector,useDispatch } from 'react-redux'
import { setUserInfo } from '../../../redux/actions/authActions';


const CompareServicesScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const [SearchKey, setSearch] = useState("");    
    const StoreItem = navigation.state.params;
    const [isVisible, setModalStatus] = useState(false); 
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [msg, setMsg] = useState('quieres confirmar la compra');
    const [confirmBtnStatus,setConfirmBtnStatus] = useState("confirm");
    const dispatch = useDispatch();

    const generateUUID = (digits) => {
        let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
        let uuid = [];
        for (let i = 0; i < digits; i++) {
            uuid.push(str[Math.floor(Math.random() * str.length)]);
        }
        return uuid.join('');
    }

    const LoadExchangeInfo = () => {        
        setLoading(true);
        db.collection("services").get().then((querySnapshot) => {
            let tempCards = [];
            querySnapshot.forEach((doc) => {
                tempCards.push({ ...doc.data(), uid: doc.id });
            });
            setServiceItems(tempCards);
            setLoading(false);
        });
    }
    useEffect(() => {
        console.log("storedetail----------------"+ navigation.state.params);
    }, [navigation.state.params])

    const _handlePurchase = () => {
        if(confirmBtnStatus === 'confirm'){
            const myCoin = user.coin;
            if (StoreItem.price > myCoin) {
                setMsg("Saldo insuficiente");
                setConfirmBtnStatus('return');
            }
            else {
                setLoading(true);
                    //decrease coin
                    let coin = user.coin - StoreItem.price;
                    db.collection("users").doc(user.email).update({
                        coin
                    }).then(()=>{
                        db.collection("users").doc(user.email).get().then((snapshot)=>{
                            let tempUser = snapshot.data();
                            tempUser.coin = coin;
                            dispatch(setUserInfo(tempUser));
                        });

                        let insertKey = generateUUID(10);
                    
                        db.collection('purchaseHistory').doc(insertKey).set({
                            title: StoreItem.title,
                            subtitle:StoreItem.subtitle,
                            brand:StoreItem.brand,
                            price : StoreItem.price,
                            image : StoreItem.image,
                            type : StoreItem.type,
                        }).then(() => {
                            setLoading(false);
                            setModalStatus(false);
                            navigation.navigate("MarketManageScreen",1);
                            Toast.show({ title: 'Purchased Successfully.', placement: 'bottom', status: 'success' })
                        }).catch(e => console.log(e))
                    });
            }
        }
        else {
            setModalStatus(false);
        }
    }

    const _handleConfirm = () => {
        setMsg('quieres confirmar la compra');
        setConfirmBtnStatus('confirm');
        setModalStatus(true);
    }

    return (
        <Box flex={1} bg="#007AFF" w='100%'>
            {loading && <Loading />}
            <StoreHeaders                
                left={
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image resizeMode='stretch' source={Images.GobackImage} height={42} width={48}/>
                    </TouchableOpacity>
                }
                color="#007AFF" 
            />
            
            <Stack>
                <Stack borderRadius={16}>
                    
                        <View style={{padding:15,height:100}}> 
                            <Image source={StoreItem.image} 
                                    style={{width:"100%", height:300}}
                                    onError={({ nativeEvent: {error} }) => console.log("error-----------------" + error) }
                                    resizeMode='contain' 
                                    borderRadius={16} 
                            />
                            <Text color="white" fontSize="40px" textAlign="center" bold>{StoreItem.title}</Text>    
                            <Text color="white" fontSize="28px" textAlign="center" height={200}>{StoreItem.subtitle}</Text>                                      
                            <View style={{marginTop:50,marginLeft:20,display:"flex",flexWrap:"wrap",alignItems:"center"}}>
                                <Text color="white" fontSize="40px" textAlign="left" bold>{StoreItem.price}catd</Text>    
                                <TouchableOpacity>
                                    <Button size="sm" ml={15} w={200} h={60} alignSelf="center" borderRadius={16} onPress={()=>_handleConfirm()}  variant="solid" backgroundColor="black">
                                        <Text fontSize="28px" color="white" bold>Comprar &gt;</Text>
                                    </Button>
                                </TouchableOpacity>
                            </View>

                            {
                                isVisible ? (
                                    <Stack style={{position:"absolute",top:-130,width:windowWidth,height:windowHeight+20}} bg="#00000085" zIndex={100}>
                                        <Box borderWidth={2} borderRadius={16} width={windowWidth-40} left={5} style = {{padding:10 ,flex: 1,zIndex:120,minHeight:300,borderColor:"black", alignItems: 'center',backgroundColor:"white",position:"absolute",top:250}}>
                                            <TouchableOpacity onPress={()=>setModalStatus(false)}>
                                                <Image source={Images.ExitImage} resizeMode="contain" />
                                            </TouchableOpacity>          
                                            <Text mt={10} fontSize="42px" textAlign="center" bold color="black" mb={10}>{msg}</Text>
                                            <TouchableOpacity mt={20} onPress={()=>_handlePurchase()}>
                                                <View backgroundColor="black"  borderRadius={20} borderWidth={2} padding={2} >
                                                    <Text fontSize="50px" color="white" paddingLeft={5} paddingRight={5}>Confirmar</Text>
                                                </View>
                                            </TouchableOpacity>  
                                        </Box>
                                    </Stack>
                                ) :
                                <></>
                            }
                        </View>
                
                </Stack>
            </Stack>
        </Box >
    )
}

export default CompareServicesScreen