import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay, Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Image,
  useDisclosure,
  Badge,
  useColorModeValue, Flex, FormControl, Input, FormLabel
} from '@chakra-ui/react';
import React from 'react';
import { CgProfile } from "react-icons/cg"
import { AiFillProfile } from "react-icons/ai"
import BasicUsage from './EditProfileModal';
import InitialFocus from './EditProfileModal';
import { LockIcon, PhoneIcon } from '@chakra-ui/icons'
export const ProfileDrawer = ({ user, value }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef();
  console.log(user, "KOIO")
  return (
    <>
      <Button ref={btnRef} bg="transparent" _hover={{ bg: "transparent" }} onClick={onOpen}>
        <CgProfile style={{ fontSize: "25px" }} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom={'1px solid darkgray'} py={3.5} lineHeight={'normal'} fontWeight={'bold'}>Profile </DrawerHeader>
          <DrawerBody>
            <Center pb={4} mt={3}>
              <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'md'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                  size={'2xl'}
                  src={
                    user.pic
                  }
                  alt={'Avatar Alt'}
                  mb={4}
                  pos={'relative'}
                  _after={{
                    content: '""',
                    w: 4,
                    h: 4,
                    bg: 'green.300',
                    border: '2px solid white',
                    rounded: 'full',
                    pos: 'absolute',
                    bottom: 0,
                    right: 3,
                  }}
                />

                <Flex justifyContent={'space-between'}>
                  <Box textAlign={'left'}>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                      {user.name}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                      @{user.name}
                    </Text>
                    <Text
                      textAlign={'center'}
                      color={useColorModeValue('gray.700', 'gray.400')}
                    >
                      {/* {user.email} */}
                    </Text>
                    <Text>
                      11:19 AM local time
                    </Text>
                  </Box>
                  <BasicUsage />
                </Flex>

                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                  <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontWeight={'400'}>
                    #art
                  </Badge>
                  <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontWeight={'400'}>
                    #photography
                  </Badge>
                  <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontWeight={'400'}>
                    #music
                  </Badge>
                </Stack>

              </Box>
            </Center>

            <Box mb={5} mt={2}>
              <Heading as='h4' size='sm' display={'Flex'} justifyContent={'space-between'} alignItems={'center'}>Contact Information <BasicUsage /></Heading>
              <FormControl mt={4}>
                <FormLabel color={'#4A5568'}><LockIcon mr={2} mt={-1} />Email Address</FormLabel>
                {user.email}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel color={'#4A5568'}> <PhoneIcon /> Phone</FormLabel>
                +6284794994
              </FormControl>
            </Box>
            {/* <Image src={"https://images.unsplash.com/photo-1527769929977-c341ee9f2033?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"} />
            <Heading bg={"blackAlpha.800"} color={"white"} textAlign={"center"}>AWS</Heading> */}

          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
              <div className="\"></div>
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
