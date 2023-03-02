import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatchUserQuery } from "../Redux/endpoints";
import { useAuthStore } from "../Redux/zustand";
import { ValidEmail } from "./emailValidation";
import { MensajeLogin, MensajeLoginError } from "./MensajeRegister";
function Login() {
  const bg = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [msgError, setMsgError] = useState(false);
  const [msgLogeo, setMsgLogeo] = useState(false);
  const setProfileAuth = useAuthStore((state) => state.setProfile);
  const {
    data: userChecked,
    isError,
    error,
    isSuccess,
  } = usePatchUserQuery(dataLogin);
  const [validate, setValidate] = useState({
    email: null,
    password: null,
  });
  const handleChange = (e) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
    if (e.target.name == "email") {
      setValidate({
        ...validate,
        email:
          e.target.value.length === 0
            ? "Value is required"
            : !ValidEmail(e.target.value)
            ? "Email not valid"
            : "",
      });
    }
    if (e.target.name === "password") {
      setDataLogin({
        ...dataLogin,
        password: e.target.value,
      });
      setValidate({
        ...validate,
        password: e.target.value.length < 8 ? "Password too short" : "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSuccess) {
      setTimeout(() => {
        setMsgLogeo(true);
        setTimeout(() => {
          setMsgLogeo(false);
          setProfileAuth(userChecked);
          navigate("/home");
        }, 500);
      }, 0);
    } else {
      setTimeout(() => {
        setMsgError(true);
        setTimeout(() => {
          setMsgError(false);
        }, 1500);
      }, 0);
    }
  };
  const signUp = () => {
    navigate("/signup");
  };
  const isValidedForm = Object.keys(validate).every(
    (key) => validate[key] === ""
  );
  return (
    <>
      <Flex height="100%" alignItems="center" justifyContent="center">
        <Box
          height="100%"
          width={"100%"}
          position="absolute"
          backgroundImage={
            "linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(/bg4.jpg)"
          }
        ></Box>
        <Box position={"relative"}>
          <Heading
            display={"flex"}
            mb={6}
            textAlign="center"
            flexDirection={"column"}
            color={"white"}
          >
            Bienvenidos
          </Heading>
          <form
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              maxWidth: "340px",

              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
            onSubmit={handleSubmit}
          >
            <Flex direction={"column"} gap={5} p={10} background={bg}>
              <Heading mb={6} textAlign="center">
                Inicio de sesión
              </Heading>
              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <Box>
                  <Text>Email</Text>
                  <Input
                    placeholder="Ingrese Email"
                    name="email"
                    type={"text"}
                    autoComplete="on"
                    autoFocus
                    onChange={handleChange}
                  />

                  <Text>Contraseña</Text>
                  <Input
                    placeholder="Ingrese una contraseña"
                    name="password"
                    type={"password"}
                    autoComplete="on"
                    autoFocus
                    onChange={handleChange}
                  />
                </Box>
                <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                  <Button
                    type="submit"
                    colorScheme={"red"}
                    isDisabled={!isValidedForm}
                  >
                    Ingresar
                  </Button>
                  <Button
                    type="submit"
                    colorScheme={"red"}
                    variant="outline"
                    onClick={signUp}
                  >
                    Registrar
                  </Button>
                </Box>
              </Box>
            </Flex>
          </form>
        </Box>
      </Flex>
      {msgError ? (
        <MensajeLoginError error={error} />
      ) : msgLogeo ? (
        <MensajeLogin userChecked={userChecked} />
      ) : null}
    </>
  );
}

export default Login;
