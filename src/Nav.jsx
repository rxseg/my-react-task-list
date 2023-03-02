import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Switch,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuthStore } from "./Redux/zustand";
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const profileAuth = useAuthStore((state) => state.profile);
  const [accionConfirmar, setAccionConfirmar] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setLogOut = useAuthStore((state) => state.logOut);
  const navigate = useNavigate();
  const onClick = () => {
    setLogOut("", null);
    navigate("/");
  };
  return (
    <>
      {profileAuth?.usuarios ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="7%"
          borderWidth="1px"
        >
          <Box display={"flex"} alignItems={"center"}>
            <Switch
              onChange={toggleColorMode}
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              m="10px"
            ></Switch>
            {colorMode === "light" ? "🌚" : "💡"}
          </Box>
          <Box display="flex" justifyContent="flex-end" w="95%" m="auto">
            <Box display={"flex"} float={"right"}>
              <Link to="/home" className="link-nav">
                <Button
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  m="4px"
                  fontSize="sm"
                  variant="outline"
                  colorScheme={"red"}
                >
                  HOME
                </Button>
                <Divider orientation="vertical" height={"50%"} />
              </Link>
              <Link to="/tasklist" className="link-nav">
                <Button
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  m="4px"
                  fontSize="sm"
                  colorScheme={"red"}
                  variant="ghost"
                >
                  LISTA DE TAREAS
                </Button>
                <Divider orientation="vertical" height={"50%"} />
              </Link>
              <Link to="/about-us" className="link-nav">
                <Button
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  m="4px"
                  fontSize="sm"
                  variant="ghost"
                  colorScheme={"red"}
                >
                  SOBRE NOSOTROS
                </Button>
                <Divider orientation="vertical" height={"50%"} />
              </Link>

              <Menu>
                <MenuButton borderRadius="50%">
                  <Box>
                    <Avatar src="https://bit.ly/broken-link" />
                  </Box>
                </MenuButton>
                <MenuList p="10px">
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    gap={"10px"}
                    p="10px"
                  >
                    <Heading>Información de la cuenta</Heading>
                    <Box p="10px" borderWidth="1px">
                      <Box
                        display={"flex"}
                        alignItems="center"
                        gap="5px"
                        p="10px"
                      >
                        <Text fontWeight="bold">Nombre:</Text>
                        <Text>{profileAuth.usuarios.nombre}</Text>
                      </Box>
                      <Divider orientation="horizontal" borderWidth={"1px"} />
                      <Box
                        display={"flex"}
                        alignItems="center"
                        gap="5px"
                        p="10px"
                      >
                        <Text fontWeight="bold">Apellido:</Text>
                        <Text>{profileAuth.usuarios.apellido}</Text>
                      </Box>
                      <Divider orientation="horizontal" borderWidth={"1px"} />
                      <Box
                        display={"flex"}
                        alignItems="center"
                        gap="5px"
                        p="10px"
                      >
                        <Text fontWeight="bold">Email:</Text>
                        <Text>{profileAuth.usuarios.email}</Text>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent={"center"}
                      alignItems="center"
                    >
                      <Button
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                        fontSize="sm"
                        colorScheme={"red"}
                        onClick={() => {
                          onOpen();
                          setAccionConfirmar(3);
                        }}
                      >
                        CERRRAR SESIÓN
                      </Button>
                    </Box>
                  </Box>
                  {onOpen ? (
                    <ConfirmDelete
                      onClose={onClose}
                      isOpen={isOpen}
                      accionConfirmar={accionConfirmar}
                      onClick={onClick}
                    />
                  ) : null}
                </MenuList>
              </Menu>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
