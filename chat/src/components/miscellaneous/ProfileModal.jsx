import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon color={"black"} />} onClick={onOpen} />
      )}
      <Modal  onClose={onClose} isOpen={isOpen} isCentered border="1px solid red">
        <ModalOverlay />
        <ModalContent display={"flex"} flexDir="row" padding={"20px"} h={"216px"} background="#f55a00eb" >
          <ModalCloseButton />
          <ModalBody w="full" >
        <div className="card">
<img width={"40%"} src={user.pic || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="John" />
<div class="container">
    <h4><b>{user.name}</b></h4> 
    <p>{user.email}</p> 
  </div>
</div>
         
       
          </ModalBody>
          
        </ModalContent>
      </Modal>
    
    </>
  );
};

export default ProfileModal;
