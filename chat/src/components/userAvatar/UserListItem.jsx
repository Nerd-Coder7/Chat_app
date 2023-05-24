import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ handleFunction,user }) => {
  console.log("Snjjiva")
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      _hover={{
        background: "var(--primary-color)",
        color: "white",
      }}
      w="100%"
      d="flex"
      color="#000"
      alignItems="center"
      bg="#fff"
      px={3}
      py={2}
      mb={2}
      boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email  : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
