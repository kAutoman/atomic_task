import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon, Text, Box, HStack, Stack, Link } from 'native-base'
import { COLOR, LAYOUT } from '../constants'
import { navigate } from '../redux/services'
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'


export default ({ }) => {
  const { user } = useSelector(store => store.auth);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Box flex={1} w='100%' bgColor={COLOR.white} borderTopRightRadius={35}>
        <Stack flex={1} pt={20}>
          <Stack flex={1}>
            {
              LAYOUT.DrawerList.map((item, key) => (
                <TouchableOpacity key={key} onPress={() => navigate(item.navLink)}>
                  <HStack alignItems='center' px={5} py={3} borderBottomWidth={1} borderColor="gray.200">
                    <Text color={COLOR.black} pl={4} fontSize={30} bold> {item.title} </Text>
                  </HStack>
                </TouchableOpacity>
              ))
            }
            {
              user.email === "atomictasks@gmail.com" ?
                <TouchableOpacity onPress={() => navigate("ConfirmsScreen")}>
                  <HStack alignItems='center' px={5} py={3} borderBottomWidth={1} borderColor="gray.200">
                    <Text color={COLOR.black} pl={4} fontSize={30} bold> {"Confirms"} </Text>
                  </HStack>
                </TouchableOpacity>
                : null
            }
          </Stack>
          <Stack mb={10}>
            <TouchableOpacity>
              <HStack alignItems='center' px={5} py={2} borderColor="gray.200">
                <Text color={"#FFB61D"} pl={1} fontSize={20} bold> UNETE A LA COMUNIDAD </Text>
              </HStack>
            </TouchableOpacity>
            <HStack px={10} space={2}>
              <Link href="https://www.instagram.com/atomic_task/">
                <Icon viewBox="0 0 36 36" size="md">{LAYOUT.InstagramIcon}</Icon>
              </Link>
              <Link href="https://twitter.com/Atomic_Task?s=09">
                <Icon viewBox="0 0 36 36" size="md">{LAYOUT.TwiterIcon}</Icon>
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </Box >
    </ScrollView>
  )
}