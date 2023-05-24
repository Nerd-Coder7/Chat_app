import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, FormControl, Input, FormLabel, Select, Grid, Box, Avatar, Text
} from '@chakra-ui/react'
import { LockIcon, PhoneIcon } from '@chakra-ui/icons'

export default function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen} background={'#fff'} color={'var(--primary-color)'} fontWeight={'bold'} h={8} >Edit</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className='EditProfileModal_block'>

                    <ModalHeader fontWeight={'bold'}>Edit your profile</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                            <Box>
                                <FormControl>
                                    <FormLabel>Full name</FormLabel>
                                    <Input placeholder='Full name' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Display name</FormLabel>
                                    <Input placeholder='Display name' />
                                    <Text fontSize={'13px'} pt={1}>This could be your first name, or a nickname — however you’d like people to refer to you in Slack.</Text>
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Title</FormLabel>
                                    <Input placeholder='Title' />
                                    <Text fontSize={'13px'} pt={1}>Let people know what you do at Aron Web Solution.</Text>
                                </FormControl>
                            </Box>
                            <Box textAlign={'center'}>
                                <Text textAlign={'left'} fontWeight={'medium'}>Profile photo</Text>
                                <Avatar mt={4}
                                    size={'2xl'}
                                    ml={'auto'}
                                />
                                <FormControl mt={4}>
                                    <FormLabel textAlign={'center'} border={'1px solid gray'} p={1} me={0}>Upload Photo</FormLabel>
                                    <Input visibility={'hidden'} type='file' />
                                </FormControl>
                            </Box>
                        </Grid>

                        <FormControl mt={4}>
                            <FormLabel><LockIcon mr={2} mt={-1}/>Email Address</FormLabel>
                            <Input type='email' placeholder='Email Address' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel><PhoneIcon mr={2} mt={-1}/> Phone</FormLabel>
                            <Input type='number' placeholder='Phone' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Name pronunciation</FormLabel>
                            <Input placeholder='Name pronunciation' />
                            <Text fontSize={'13px'} pt={1}>This could be a phonetic pronunciation, or an example of something your name sounds like.</Text>
                        </FormControl>

                        <Select placeholder='Time zone' mt={4}>
                            <option value='option1'>Mumbai New Delhi</option>
                            <option value='option2'>England</option>
                            <option value='option3'>USA</option>
                        </Select>
                        <Text fontSize={'13px'} pt={1}>Your current time zone. Used to send summary and notification emails, for times in your activity feeds, and for reminders.</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}  mr={3}>Cancel</Button>
                        <Button colorScheme='blue'>
                            Save Changes
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}