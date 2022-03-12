import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, ScrollView, Text, Button, Image, CheckIcon, HStack, Icon,Input,Toast,TextArea, Select } from 'native-base'
import { Loading } from '../../../components'
import { COLOR, db, Images, storage } from '../../../constants'
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';

const QuestionsScreeen = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [brand, setBrand] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState(Images.NoImage);
    const [type, setType] = useState('digital');
    const [item, setItem] = useState(navigation.state.params)
    const { user } = useSelector((store) => store.auth)

    const uploadImageAsync = async (uri) => {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });

        setLoading(true);

        const timeStamp = Math.floor(Date.now() / 1000);
        const insertKey = "_" + timeStamp;
      
        const ref = firebase
          .storage()
          .ref()
          .child(`stocks/${insertKey}.png`);
        const snapshot = await ref.put(blob);
      
        // We're done with the blob, close and release it
        blob.close();

        setLoading(false);
      
        return await snapshot.ref.getDownloadURL();
      }


    const openImagePickerAsync = async () => {
        // let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        // if (permissionResult.granted === false) {
        //   alert("Permission to access camera roll is required!");
        //   return;
        // }
        // Pick the photo
        // const pickerResult = await ImagePicker.launchImageLibraryAsync({
        //     allowsEditing: true,
        //     aspect: [1, 1]
        // });
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        const imageUrl = await uploadImageAsync(pickerResult.uri);
        setImage({uri : imageUrl});
    }

    const toggleSwitch = () => {
        setChecked(!checked);
    };

    const LoadExchangeInfo = () => {
        if(item){
            setTitle(item.title);
            setSubtitle(item.subtitle);
            setBrand(item.brand);
            setPrice(item.price);
            setImage(item.image);
        }
    }

    const _handleSave = async () => {
        if(!title){
            return Toast.show({ title: 'Tile required!', placement: 'bottom', status: 'error' })
        }

        if(!subtitle){
            return Toast.show({ title: 'Subtitle required!', placement: 'bottom', status: 'error' })
        }

        if(!brand){
            return Toast.show({ title: 'brand required!', placement: 'bottom', status: 'error' })
        }
        if(!price){
            return Toast.show({ title: 'price required!', placement: 'bottom', status: 'error' })
        }
        if(!image){
            return Toast.show({ title: 'image required!', placement: 'bottom', status: 'error' })
        }
        
        const timeStamp = Math.floor(Date.now() / 1000);
        const insertKey = "_" + timeStamp;
        setLoading(true);
        if (item) {
            await db.collection('Stocks').doc(item.uid).update({
                title,
                subtitle,
                brand,
                price,
                image,
                type,
            }).then(() => {
                setLoading(false);
                navigation.navigate("MarketManageScreen",1);
                Toast.show({ title: 'Stock updated successfully', placement: 'bottom', status: 'success' })
            }).catch(e => console.log(e))
        } else {
            await db.collection('Stocks').doc(insertKey).set({
                title,
                subtitle,
                brand,
                price,
                image,
                type,
            }).then(() => {
                setLoading(false);
                navigation.navigate("MarketManageScreen",1);
                Toast.show({ title: 'stock inserted', placement: 'bottom', status: 'success' })
            }).catch(e => console.log(e))
        }
        
        return;
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.white} w='100%' pt={0}>
            {loading && <Loading />}
            <Stack h={81}>
                <Box w={10} zIndex={10} top={8} left={5}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image zIndex={10} size="xs" source={Images.ExitImage} resizeMode="contain" />
                    </TouchableOpacity>
                </Box>
                <Text color="black" fontSize="4xl" bold alignSelf="center">Stock</Text>
            </Stack>
            <Stack flex={1} px={3}>

                <Stack py={1} flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Stack my={3} style={{borderRadius:10}}>
                            <Text color="black" fontSize="3xl" flex={1} p={3} bold>Title</Text>
                            <HStack alignItems="center">
                                <Input mx={3} placeholder="" onChangeText={(e) => setTitle(e)} w="95%" value={title}/>
                            </HStack>
                        </Stack>
                        <Stack my={3}>
                            <Text color="black" fontSize="3xl" flex={1} p={3} bold>Subtitle</Text>
                            <TextArea mx={3} h={100} placeholder="Please input subtitle here" onChangeText={(e) => setSubtitle(e)} w="95%" value={subtitle} />
                        </Stack>
                        <Stack my={3} mx={3}>
                            <TouchableOpacity onPress={openImagePickerAsync}>
                                <Image source={image} borderRadius={30} height={300} resizeMode="contain"/>
                            </TouchableOpacity>
                        </Stack>
                        <Stack my={3} style={{borderRadius:10}}>
                            <Text color="black" fontSize="3xl" flex={1} p={3} bold>Brand</Text>
                            <HStack alignItems="center">
                                <Input mx={3} placeholder="" onChangeText={(e) => setBrand(e)} w="95%" value={brand}/>
                            </HStack>
                        </Stack>
                        <Stack my={3} style={{borderRadius:10}}>
                            <Text color="black" fontSize="3xl" flex={1} p={3} bold>Type</Text>
                            <HStack alignItems="center">
                                <Select selectedValue={type} 
                                    width="95%"
                                    mx={3}
                                    accessibilityLabel="Select type" 
                                    placeholder="Select type" 
                                    onValueChange={itemValue => {
                                        setType(itemValue)
                                    }} 
                                    color="black"
                                    _selectedItem={{
                                        bg: "cyan.600",
                                        endIcon: <CheckIcon size={4} />
                                }}>
                                    <Select.Item label="Digital" value="digital" />
                                    <Select.Item label="Fisico" value="fisico" />
                                </Select>
                            </HStack>
                        </Stack>
                        <Stack my={3} style={{borderRadius:10}}>
                            <Text color="black" fontSize="3xl" flex={1} p={3} bold>Price</Text>
                            <HStack alignItems="center">
                                <Input mx={3} placeholder="" onChangeText={(e) => setPrice(e)} w="95%" value={price}/>
                            </HStack>
                        </Stack>
                        
                    </ScrollView>
                </Stack>
            </Stack>
            <TouchableOpacity onPress={() => _handleSave()}>
                <Stack alignItems="center" bottom={0} h={66} bg="#18191F" width="100%" py={2}>
                    <Text color="white" fontSize="3xl" flex={1}>Save</Text>
                </Stack>
            </TouchableOpacity>
           
        </Box>
    )
}

export default QuestionsScreeen