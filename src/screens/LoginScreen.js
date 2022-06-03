import React from "react";
import { Box, Center, Image, Text } from "native-base";
import Images from "../images/Images";
import LoginForm from "../components/forms/LoginForm";
import { TouchableOpacity, useColorScheme } from "react-native";
import { loginUser, useAuth } from "../contexts/AuthContext";

function LoginScreen({ navigation }) {
  const isDarkMode = useColorScheme() === "dark";

  const { dispatch } = useAuth();

  const handleLogin = async (credentials) => {
    console.log("bjr");
    await loginUser(credentials, dispatch);
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
        <LoginForm onLogin={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Pas de compte ?</Text>
        </TouchableOpacity>
      </Center>
    </Box>
  );
}

export default LoginScreen;
