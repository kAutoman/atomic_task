import React from "react"
import { View, Center, HStack, Icon, Pressable, Text, Spinner, Avatar, Box } from "native-base"
import { navigate } from "../redux/services"
import { COLOR, Images, LAYOUT } from "../constants"

export const Headers = ({ title = "",bg= null, left = null, right = null }) => {
  return (
    <HStack
      h={65}
      px={7}
      mt={12}
      bg={bg ? bg :COLOR.base}
      alignItems="center"
      justifyContent='space-between'
    >
      <View alignItems='flex-start' w={10}>{left}</View>
      <Text fontSize='lg' bold color={COLOR.white}>{title}</Text>
      <View alignItems='flex-end' w={10}>{right}</View>
    </HStack>
  )
}

export const StoreHeaders = ({ title = "", left = null, right = null, color= "#FA6E5A" }) => {
  return (
    <HStack
      h={55}
      px={7}
      mt={12}
      mb={2}
      bg={color}
      alignItems="center"
      justifyContent='space-between'
    >
      <View alignItems='flex-start' w={10}>{left}</View>
      <Text fontSize='lg' bold color={COLOR.white}>{title}</Text>
      <View alignItems='flex-end' w={10}>{right}</View>
    </HStack>
  )
}

export const Footers = ({ routeName }) => {
  return (
    <HStack bg={COLOR.white} borderTopWidth={1} alignItems="center" safeAreaBottom shadow={3}>
      <Pressable
        py={2}
        flex={1}
        onPress={() => navigate('HomeScreen')}
      >
        <Center>
          <Icon mb={1} color={COLOR.base} size="sm" viewBox="0 0 24 24">{routeName === "HomeScreen" ? LAYOUT.InicioActiveIcon : LAYOUT.InicioIcon}</Icon>
          <Text color={COLOR.base} fontSize='xs'>Inicio</Text>
        </Center>
      </Pressable>
      <Pressable
        py={2}
        flex={1}
        onPress={() => navigate('DescubreScreen')}
      >
        <Center>
          <Icon mb={1} color={COLOR.base} size="sm" viewBox="0 0 24 24">{routeName === "DescubreScreen" ? LAYOUT.DescubreActiveIcon : LAYOUT.DescubreIcon}</Icon>
          <Text color={COLOR.base} fontSize='xs'>Descubre</Text>
        </Center>
      </Pressable>
      <Pressable
        py={2}
        flex={1}
        onPress={() => navigate('ChatScreen')}
      >
        <Center>
          <Icon mb={1} color={COLOR.base} size="sm" viewBox="0 0 24 24">{routeName === "ChatScreen" ? LAYOUT.ChatActiveIcon : LAYOUT.ChatIcon}</Icon>
          <Text color={COLOR.base} fontSize='xs'>Chat</Text>
        </Center>
      </Pressable>
      <Pressable
        py={2}
        flex={1}
        onPress={() => navigate('BlogScreen')}
      >
        <Center>
          <Icon mb={1} color={COLOR.base} size="sm" viewBox="0 0 24 24">{routeName === "BlogScreen" ? LAYOUT.BlogActiveIcon : LAYOUT.BlogIcon}</Icon>
          <Text color={COLOR.base} fontSize='xs'>Blog</Text>
        </Center>
      </Pressable>
      <Pressable
        py={2}
        flex={1}
        onPress={() => navigate('PerfilScreen')}
      >
        <Center>
          <Icon mb={1} color={COLOR.base} size="sm" viewBox="0 0 24 24">{routeName === "PerfilScreen" ? LAYOUT.PerfilActiveIcon : LAYOUT.PerfilIcon}</Icon>
          <Text color={COLOR.base} fontSize='xs'>Perfil</Text>
        </Center>
      </Pressable>
    </HStack>
  )
}


export const Loading = () => {
  return (
    <View style={{
      position: 'absolute',
      elevation: 10,
      width: LAYOUT.window.width,
      height: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    }}>
      <Spinner color="blue.500" size="lg" />
    </View>
  )
}

export const PrivateMessage = ({ item, user, userData }) => {
  if ((item.sender === user.email && item.receiver == userData.email) || (item.sender == userData.email && item.receiver == user.email)) {
    if (item.receiver == user.email) {
      return (
        <HStack px={5} my={1} space={5}>
          <Box w={"12%"}>
            <Avatar source={Images.SampleAvatar3} >
              AK
            </Avatar>
          </Box>
          <Box p={3} bg="#FFBD12" maxW="75%" borderWidth={2} borderRadius={16}>
            <Text color="black" fontWeight={item.state === false ? "bold" : "normal"}>
              {item.message}
            </Text>
          </Box>
        </HStack>
      )
    } else {
      return (
        <HStack px={5} my={1} mt={3} space={5} justifyContent="flex-end">
          <Box p={3} bg="#00C6AE" maxW="75%" borderWidth={2} borderRadius={16}>
            <Text color="black">
              {item.message}
            </Text>
          </Box>
        </HStack>
      )
    }
  } else {
    return <View />
  }
}

export const ChatBotMessage = ({ message }) => {
       return  <HStack px={2} my={1} space={5} mt={10}>
          <Box w={"12%"}>
            <Avatar source={Images.BotAvatar} bg="white" width={75} height={75}>
              AK
            </Avatar>
          </Box>
          <Box p={3} bg="black" maxW="75%" borderWidth={2} borderRadius={16}>
            <Text color="white" bold>
              {message}
            </Text>
          </Box>
        </HStack>
   
}