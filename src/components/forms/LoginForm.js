import React, { useState } from "react";
import {
  Container,
  Button,
  FormControl,
  Input,
  WarningOutlineIcon,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { loginStyle } from "../../theme/Styles";

function LoginForm({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  return (
    <Container w="80%">
      <FormControl style={loginStyle.input}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          onChangeText={(text) =>
            setCredentials({ ...credentials, email: text })
          }
          value={credentials.email}
          placeholder="joe@doe.com"
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
          Une erreur s'est produite
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl>
        <FormControl.Label>Mot de passe</FormControl.Label>
        <Input
          onChangeText={(text) =>
            setCredentials({ ...credentials, password: text })
          }
          value={credentials.password}
          type={showPassword ? "text" : "password"}
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="1/6"
              h="full"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Icon name="eye" size={25} />
              ) : (
                <Icon name="eye-off" size={25} />
              )}
            </Button>
          }
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
          Une erreur s'est produite
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        style={loginStyle.button}
        w="100%"
        onPress={() => onLogin(credentials)}
      >
        Se connnecter
      </Button>
    </Container>
  );
}

export default LoginForm;
