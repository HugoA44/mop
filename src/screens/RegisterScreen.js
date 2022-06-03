import React from "react";
import { Box, Center, Image, Text } from "native-base";
import { useColorScheme, TouchableOpacity } from "react-native";
import Images from "../images/Images";
import { registerUser, useAuth } from "../contexts/AuthContext";
import RegisterForm from "../components/forms/RegisterForm";

function RegisterScreen({ navigation }) {
  const isDarkMode = useColorScheme() === "dark";

  const { dispatch } = useAuth();

  const handleRegister = async (registrationCredentials) => {
    await registerUser(registrationCredentials, dispatch);
  };

  return (
    <Box style={{ backgroundColor: "white", height: "100%" }}>
      <Center>
        <Image
          source={Images.logo}
          size="2xl"
          resizeMode="contain"
          alt="App Logo"
        />
        <RegisterForm onRegister={handleRegister} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text top="-60px">J'ai déjà un compte</Text>
        </TouchableOpacity>
      </Center>
    </Box>
  );
}

export default RegisterScreen;
