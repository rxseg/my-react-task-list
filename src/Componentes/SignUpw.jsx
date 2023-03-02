import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePostUserMutation } from "../Redux/endpoints";
import { ValidEmail } from "./emailValidation";
import { MensajeNoRegister, MensajeRegisterExito } from "./MensajeRegister";

function SignUp() {
  const navigate = useNavigate();
  const [createUser, { data: isPost, error: msgError }] = usePostUserMutation();
  const [msg, setMsg] = useState(false);
  const [msgErro, setMsgRrror] = useState(false);
  const [validation, setValidation] = useState({
    nombre: undefined,
    apellido: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const [dataSignUp, setDataSignUp] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "nombre") {
      setValidation({
        ...validation,
        nombre: e.target.value.length > 0 ? "" : "Se require rellenar el campo",
      });
    }
    if (e.target.name === "apellido") {
      setValidation({
        ...validation,
        apellido:
          e.target.value.length > 0 ? "" : "Se require rellenar el campo",
      });
    }
    if (e.target.name === "email") {
      setValidation({
        ...validation,
        email:
          e.target.value.length === 0
            ? "Se require rellenar este campo"
            : ValidEmail(e.target.value)
            ? ""
            : "Email Inválido",
      });
    }
    if (e.target.name === "password") {
      setDataSignUp({
        ...dataSignUp,
        password: e.target.value,
      });
    }
    if (e.target.name === "confirmPassword") {
      setValidation({
        ...validation,
        confirmPassword:
          e.target.value !== dataSignUp.password
            ? "Password does not match"
            : "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = createUser({
      nombre,
      apellido,
      email,
      password,
    });
    setTimeout(() => {
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
      }, 1500);
    }, 0);
    setTimeout(() => {
      setMsgRrror(true);
      setTimeout(() => {
        setMsgRrror(false);
      }, 1500);
    }, 0);
  };
  useEffect(() => {
    if (dataSignUp.password.length >= 0) {
      setValidation((validation) => {
        return {
          ...validation,
          password:
            dataSignUp.password.length < 8 && dataSignUp.password.length > 0
              ? "The password must be at least 8 characters long"
              : dataSignUp.password.length === 0
              ? ""
              : "",
        };
      });
    }
  }, [dataSignUp]);
  const isValidedForm = Object.keys(validation).every(
    (key) => validation[key] === ""
  );

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100%"}
      backgroundImage={
        "linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(/bg4.jpg)"
      }
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        w={"20%"}
        borderWidth={"1px"}
        p={"20px"}
        boxShadow={"lg"}
        background={"white"}
      >
        <Heading
          display={"flex"}
          mb={6}
          textAlign="center"
          flexDirection={"column"}
        >
          Registro de Usuario
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel requiredIndicator={false}>Nombres</FormLabel>
            <Input
              placeholder="Escriba nombres"
              name="nombre"
              type={"text"}
              onChange={handleChange}
            />
            <Text color={"red"} as={"i"}>
              {validation.nombre}
            </Text>
            <FormLabel requiredIndicator={false}>Apellidos</FormLabel>
            <Input
              placeholder="Escriba apellidos"
              name="apellido"
              type={"text"}
              onChange={handleChange}
            />
            <Text color={"red"} as={"i"}>
              {validation.apellido}
            </Text>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              placeholder="Escriba email"
              name="email"
              type="email"
              onChange={handleChange}
            />
            <Text color={"red"} as={"i"}>
              {validation.email}
            </Text>
            <FormLabel>Contraseña</FormLabel>
            <Input
              placeholder="Escriba contraseña"
              name="password"
              type={"password"}
              onChange={handleChange}
            />
            <Text color={"red"} as={"i"}>
              {validation.password}
            </Text>
            <FormLabel>Confirmar Contraseña</FormLabel>
            <Input
              placeholder="Escriba contraseña"
              name="confirmPassword"
              onChange={handleChange}
              type={"password"}
            />
            <Text color={"red"} as={"i"}>
              {validation.confirmPassword}
            </Text>
            <Box display={"flex"} flexDirection={"column"} mt={3}>
              <Button
                type="submit"
                colorScheme={"red"}
                boxShadow={"lg"}
                isDisabled={!isValidedForm}
              >
                Registrar
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
      {msg ? <MensajeRegisterExito isPost={isPost} /> : null}
      {msgErro ? <MensajeNoRegister msgError={msgError} /> : null}
    </Box>
  );
}

export default SignUp;
