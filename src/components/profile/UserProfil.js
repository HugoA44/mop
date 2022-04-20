import React from "react";
import { logoutUser, useAuth } from "../../contexts/AuthContext";
import { Box, Button, Center, Container, Flex, Text } from "native-base";
import { styles } from "../../theme/Profil";

function UserProfil() {
  const { dispatch, state } = useAuth();

  // Déconnexion
  const handleLogout = async () => {
    await logoutUser(dispatch);
  };

  // Récupération des informations de l'utilisateur
  const userInfos = state.user;

  // Afficher la classe de l'élève
  const studentUser = () => {
    if (userInfos.status === "student") {
      return <Text style={styles.tags}>{userInfos.class}</Text>;
    }
  };

  return (
    <Container
      style={{ maxWidth: "100%", alignItems: "center" }}
      h="100%"
      w="100%"
    >
      <Box>
        <Center>
          <Button onPress={() => handleLogout()} style={styles.logout}>
            Se déconnecter
          </Button>
          {/* <Flex direction="row">
            <Text style={styles.titleText}>{userInfos.firstName}</Text>
            <Text style={styles.titleText}>{userInfos.lastName}</Text>
          </Flex>
          <Flex direction="row">
            <Text style={styles.tags}>{userInfos.school}</Text>
            <Text style={styles.tags}>{userInfos.status}</Text>
            {studentUser}
          </Flex>
          <Text>{userInfos.phone}</Text>
          <Text>{userInfos.email}</Text>
          <Text>{userInfos.bio}</Text> */}
        </Center>
      </Box>
    </Container>
  );
}

export default UserProfil;
